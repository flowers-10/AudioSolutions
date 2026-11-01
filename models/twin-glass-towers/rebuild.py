"""Rebuild the Meshy reference as editable architecture using Blender 4.5 LTS.

blender --background --factory-startup --python rebuild.py -- --root PATH
One Blender unit = one inferred metre. No source mesh or textures are reused.
"""
import argparse
import json
import math
from pathlib import Path
import random
import sys

import bpy
from mathutils import Vector

parser = argparse.ArgumentParser()
parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[2])
parser.add_argument('--render', action='store_true')
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
ROOT = args.root.resolve()
OUT = ROOT / 'public/models/twin-glass-towers'
SOURCE = ROOT / 'models/twin-glass-towers'
OUT.mkdir(parents=True, exist_ok=True)
SOURCE.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
rng = random.Random(1101141931)

# Measured from horizontal slices of the supplied mesh, scaled by 100.
TOWER_CENTRES = (-44.5, 44.5)
WIDTH, DEPTH = 63.0, 55.0
FRONT, BACK = -13.0, 42.0
BASE, FLOOR_HEIGHT, FLOORS = 17.0, 2.6, 40
EAVE, HIGH_ROOF = BASE + FLOOR_HEIGHT * FLOORS, 126.0
MATERIALS = {}

def linear(c):
    return c / 12.92 if c < .04045 else ((c + .055) / 1.055) ** 2.4

def material(name, color, metallic=0, roughness=.5, coat=0):
    rgb = tuple(linear(int(color[i:i+2], 16) / 255) for i in (1, 3, 5))
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*rgb, 1)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = (*rgb, 1)
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Coat Weight'].default_value = coat
    bsdf.inputs['Coat Roughness'].default_value = .16
    MATERIALS[name] = m
    return name

CONCRETE = material('Limestone | podium and terraces', '#c8cdcf', roughness=.76)
EDGE = material('Brushed aluminium | slab edges', '#a1b3bc', .65, .32)
FRAME = material('Anodised aluminium | mullions', '#93acb9', .6, .3)
DARK = material('Graphite | recessed structure', '#263d48', .12, .63)
SPANDREL = material('Blue grey | insulated spandrels', '#3a5869', .4, .32)
GLASS = [material(f'Vision glass | tint {i+1:02}', c, .48, .22, .7)
         for i, c in enumerate(['#577e91','#52788c','#618698','#4c7489','#698c9c','#4b6f83'])]
ROOF = material('Roof glazing | blue grey', '#416778', .18, .46, .25)
ROOF_METAL = material('Roof seams | aluminium', '#8fa8b5', .6, .35)
LOBBY = material('Lobby glazing | shaded blue', '#304c5c', .35, .26, .55)
VENT = material('Louvre shadow | dark recess', '#1f3440', .15, .6)
PAVING = material('Terrace paving | pale stone', '#afb8be', 0, .85)

class Part:
    """Batch architecture by editable part, with explicitly oriented flat faces."""
    def __init__(self, name, collection):
        self.name, self.collection = name, collection
        self.vertices, self.faces, self.face_materials, self.slots = [], [], [], []

    def face(self, points, mat):
        if mat not in self.slots: self.slots.append(mat)
        start = len(self.vertices)
        self.vertices.extend(points)
        self.faces.append(tuple(range(start, start + len(points))))
        self.face_materials.append(self.slots.index(mat))

    def box(self, center, size, mat):
        x,y,z = center
        a,b,c = [s / 2 for s in size]
        v = [(x-a,y-b,z-c),(x+a,y-b,z-c),(x+a,y+b,z-c),(x-a,y+b,z-c),
             (x-a,y-b,z+c),(x+a,y-b,z+c),(x+a,y+b,z+c),(x-a,y+b,z+c)]
        for face in [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]:
            self.face([v[i] for i in face], mat)

    def ring(self, cx, cy, z, w, d, thick, height, mat):
        self.box((cx,cy-d/2+thick/2,z),(w,thick,height),mat)
        self.box((cx,cy+d/2-thick/2,z),(w,thick,height),mat)
        self.box((cx-w/2+thick/2,cy,z),(thick,d-2*thick,height),mat)
        self.box((cx+w/2-thick/2,cy,z),(thick,d-2*thick,height),mat)

    def finish(self):
        if not self.faces: return None
        mesh = bpy.data.meshes.new(self.name)
        mesh.from_pydata(self.vertices, [], self.faces)
        for name in self.slots: mesh.materials.append(MATERIALS[name])
        for polygon, index in zip(mesh.polygons, self.face_materials):
            polygon.material_index = index
        mesh.update()
        obj = bpy.data.objects.new(self.name, mesh)
        self.collection.objects.link(obj)
        obj['construction'] = 'Authored geometry; no AI mesh or texture reuse'
        return obj

def collection(name):
    c = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(c)
    return c

def tower(cx, label):
    c = collection(label)
    low, high = cx-WIDTH/2, cx+WIDTH/2
    cy = (FRONT+BACK)/2
    core = Part(f'{label} / recessed envelope', c)
    core.box((cx,cy,(BASE+EAVE)/2),(WIDTH-2,DEPTH-2,EAVE-BASE),DARK)
    core.finish()
    panes = Part(f'{label} / individual vision panels',c)
    spandrels = Part(f'{label} / floor spandrels',c)
    mullions = Part(f'{label} / vertical mullions',c)
    bands = Part(f'{label} / horizontal fins',c)
    # Outward CCW quads. Separate panel geometry avoids blurry baked detail.
    for y, front in [(FRONT,True),(BACK,False)]:
        n = 24
        for floor in range(FLOORS):
            z = BASE + floor*FLOOR_HEIGHT
            spandrels.box((cx,y,z+.31),(WIDTH,.18,.62),SPANDREL)
            for j in range(n):
                x0 = low+j*WIDTH/n+.065
                x1 = low+(j+1)*WIDTH/n-.065
                points = [(x0,y,z+.66),(x1,y,z+.66),(x1,y,z+FLOOR_HEIGHT-.10),(x0,y,z+FLOOR_HEIGHT-.10)]
                panes.face(points if front else points[::-1],rng.choice(GLASS))
        for j in range(n+1):
            mullions.box((low+j*WIDTH/n,y,(BASE+EAVE)/2),(.13,.23,EAVE-BASE),FRAME)
    for x, left in [(low,True),(high,False)]:
        n = 21
        for floor in range(FLOORS):
            z = BASE+floor*FLOOR_HEIGHT
            spandrels.box((x,cy,z+.31),(.18,DEPTH,.62),SPANDREL)
            for j in range(n):
                y0 = FRONT+j*DEPTH/n+.065
                y1 = FRONT+(j+1)*DEPTH/n-.065
                points = [(x,y0,z+.66),(x,y1,z+.66),(x,y1,z+FLOOR_HEIGHT-.10),(x,y0,z+FLOOR_HEIGHT-.10)]
                panes.face(points[::-1] if left else points,rng.choice(GLASS))
        for j in range(n+1):
            mullions.box((x,FRONT+j*DEPTH/n,(BASE+EAVE)/2),(.23,.13,EAVE-BASE),FRAME)
    for floor in range(FLOORS+1):
        z = BASE+floor*FLOOR_HEIGHT
        bands.ring(cx,cy,z,WIDTH+.48,DEPTH+.48,.36,.14,EDGE)
        if floor < FLOORS:
            bands.ring(cx,cy,z+.61,WIDTH+.18,DEPTH+.18,.19,.075,FRAME)
    # Larger architectural belt and corner caps, also evident in the reference.
    bands.ring(cx,cy,84.6,WIDTH+.65,DEPTH+.65,.45,.36,EDGE)
    for x in (low,high):
        for y in (FRONT,BACK):
            mullions.box((x,y,(BASE+EAVE)/2),(.3,.3,EAVE-BASE),EDGE)
    for part in (panes,spandrels,mullions,bands): part.finish()

    services = Part(f'{label} / recessed service stacks and louvres',c)
    # Each tower's inner facade has an articulated pale vertical service bay.
    inward = -1 if cx > 0 else 1
    spine = cx+inward*(WIDTH/2-5.2)
    for y in (FRONT-.22,BACK+.22):
        services.box((spine,y,54.8),(8.7,.55,75.6),VENT)
        for x in (spine-4.45,spine+4.45):
            services.box((x,y+(-.25 if y<0 else .25),54.8),(.56,.9,75.8),CONCRETE)
        for level in range(24):
            z = BASE+level*3.14
            services.box((spine,y,z),(8.6,1.05,.48),EDGE)
            for dz in (.93,1.2,1.47):
                services.box((spine,y,z+dz),(7.8,.75,.10),FRAME)
    # Slim vertical accent on the outside face, stopping below the crown.
    outer = cx-inward*(WIDTH/2+.20)
    services.box((outer,cy+10.7,54.2),(.46,.5,74.4),EDGE)
    services.finish()

    crown = Part(f'{label} / folded roof and standing seams',c)
    # Observed mirrored profile: high outer half, sloping joint, low inner half.
    if cx < 0:
        profile = [(low,HIGH_ROOF), (cx+3.4,HIGH_ROOF), (cx+8.4,EAVE+.15),(high,EAVE+.15)]
    else:
        profile = [(low,EAVE+.15),(cx-8.4,EAVE+.15),(cx-3.4,HIGH_ROOF),(high,HIGH_ROOF)]
    for (x0,z0),(x1,z1) in zip(profile,profile[1:]):
        crown.face([(x0,FRONT,z0),(x1,FRONT,z1),(x1,BACK,z1),(x0,BACK,z0)],ROOF)
        crown.face([(x0,FRONT,EAVE-.2),(x1,FRONT,EAVE-.2),(x1,FRONT,z1),(x0,FRONT,z0)],SPANDREL)
        crown.face([(x0,BACK,z0),(x1,BACK,z1),(x1,BACK,EAVE-.2),(x0,BACK,EAVE-.2)],SPANDREL)
        for k in range(1,12):
            x = x0+(x1-x0)*k/12
            z = z0+(z1-z0)*k/12
            crown.box((x,cy,z+.035),(.10,DEPTH,.07),ROOF_METAL)
        for j in range(12):
            y = FRONT+j*DEPTH/11
            # A thin quad follows the sloping fold without floating seams.
            crown.face([(x0,y-.04,z0+.03),(x1,y-.04,z1+.03),(x1,y+.04,z1+.03),(x0,y+.04,z0+.03)],ROOF_METAL)
    for x,z in (profile[0],profile[-1]):
        if z>EAVE:
            points=[(x,FRONT,EAVE-.2),(x,BACK,EAVE-.2),(x,BACK,z),(x,FRONT,z)]
            crown.face(points[::-1] if x==low else points,SPANDREL)
    high0, high1 = (low,cx+3.4) if cx<0 else (cx-3.4,high)
    for y in (FRONT-.02,BACK+.02):
        for z in (EAVE+.8,EAVE+2.6,EAVE+4.4):
            crown.box(((high0+high1)/2,y,z),(high1-high0,.25,.13),EDGE)
        for j in range(15):
            crown.box((high0+j*(high1-high0)/14,y,(EAVE+HIGH_ROOF)/2),(.11,.18,HIGH_ROOF-EAVE),FRAME)
    crown.finish()

def podium():
    c = collection('Podium / stepped U terraces')
    body = Part('Podium / lobby glazing',c)
    columns = Part('Podium / columns and door frames',c)
    slabs = Part('Podium / layered terrace slabs',c)
    rails = Part('Podium / terrace balustrades',c)
    # Side pavilions leave the deep central recess visible in the reference.
    for cx in (-56.5,56.5):
        body.box((cx,.5,3),(72,99,5.8),LOBBY)
        slabs.box((cx,.5,.24),(74,101,.48),CONCRETE)
        slabs.box((cx,.5,6.3),(75,102,.65),CONCRETE)
        for y in (-49.3,50.3):
            for j in range(8):
                x = cx-35.8+j*71.6/7
                columns.box((x,y,3.2),(1.15,1.4,6),CONCRETE)
            for j in range(29):
                columns.box((cx-35+j*70/28,y,3.2),(.12,.22,5.6),FRAME)
        for x in (cx-36,cx+36):
            for j in range(10):
                columns.box((x,-48+j*97/9,3.2),(1.1,1.2,6),CONCRETE)
        # Rear tower plinth and its lower entrance canopy.
        slabs.box((cx+(-12 if cx>0 else 12),14.5,8.1),(68,60,.65),EDGE)
        for side in (-1,1):
            slabs.box((cx+side*24,-50.6,6.1),(14,2.2,.25),EDGE)
    # Front crossbar plus lateral returns make five clear, continuous U steps.
    for i in range(5):
        z = 7.0+i*2.45
        w = 187-i*7.2
        front, back = -51+i*3.5, -17+i*.45
        slabs.box((0,(front+back)/2,z),(w,back-front,.6),CONCRETE)
        slabs.box((0,(front+back)/2,z+.34),(w-.65,back-front-.65,.09),PAVING)
        body.box((0,(front+back)/2,z-1.1),(w-2,back-front-1,1.65),LOBBY)
        # Low coping and an inset dark band articulate each roof perimeter.
        rails.box((0,front+.24,z+.53),(w,.32,.46),EDGE)
        for side in (-1,1):
            cx = side*(w/2-8.8)
            length = 60-i*2.3
            slabs.box((cx,back+length/2,z),(17.6,length,.6),CONCRETE)
            rails.box((side*(w/2-.25),back+length/2,z+.53),(.32,length,.46),EDGE)
    # Discrete stair treads and entrance doors add detail at human scale.
    for side in (-1,1):
        for i in range(7):
            slabs.box((side*55,-51.3-i*.42,.15+i*.16),(15,.46,.30+i*.32),CONCRETE)
    for x in (-56,-53,-50,50,53,56):
        columns.box((x,-49.55,2.8),(.10,.2,4.9),EDGE)
        columns.box((x+.5,-49.72,2.8),(.06,.12,.65),EDGE)
    # The low bridge between the twin towers, below the open central slot.
    slabs.box((0,14.5,6.3),(40,55,.65),CONCRETE)
    for part in (body,columns,slabs,rails): part.finish()

podium()
for cx,label in zip(TOWER_CENTRES,('Tower West','Tower East')): tower(cx,label)

scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene['source_reference'] = 'Meshy_AI_Twin_Glass_Towers_1101141931_texture.glb'
scene['scale_note'] = '1 unit = 1 inferred metre; proportions from supplied mesh, not surveyed dimensions'
scene['reconstruction'] = 'Clean authored surfaces, individual panels, mullions, fins, mirrored folded crowns, service louvres, U podium'
scene.render.engine = 'BLENDER_EEVEE_NEXT'
scene.eevee.taa_render_samples = 48
scene.render.resolution_x, scene.render.resolution_y = 1600, 1200
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = 'AgX'
scene.world = bpy.data.worlds.new('Architectural daylight')
scene.world.use_nodes = True
scene.world.node_tree.nodes['Background'].inputs[0].default_value = (.62,.74,.9,1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value = .7
studio = collection('Studio / excluded from GLB')
for name, location, energy, size in [('Key',(-120,-160,230),2000000,180),('Fill',(170,-40,150),1400000,150),('Rim',(-60,150,200),2200000,130)]:
    data = bpy.data.lights.new(name,'AREA')
    data.energy, data.shape, data.size = energy,'DISK',size
    obj = bpy.data.objects.new(name,data)
    studio.objects.link(obj)
    obj.location = location
    obj.rotation_euler = (Vector((0,0,65))-obj.location).to_track_quat('-Z','Y').to_euler()
data = bpy.data.cameras.new('Architectural camera')
camera = bpy.data.objects.new('Architectural camera',data)
studio.objects.link(camera)
scene.camera = camera
camera.location = (205,-300,200)
target = Vector((0,0,58))
camera.rotation_euler = (target-camera.location).to_track_quat('-Z','Y').to_euler()
data.type, data.ortho_scale = 'ORTHO',260
# Open the .blend in material mode, framed on the finished architecture.
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type == 'VIEW_3D':
            area.spaces.active.region_3d.view_distance = 260
            area.spaces.active.region_3d.view_location = (0,0,58)
            area.spaces.active.region_3d.view_rotation = camera.rotation_euler.to_quaternion()
            area.spaces.active.shading.type = 'MATERIAL'

meshes = [o for o in scene.objects if o.type=='MESH']
bpy.ops.object.select_all(action='DESELECT')
for obj in meshes: obj.select_set(True)
bpy.context.view_layer.objects.active = meshes[0]
glb = OUT / 'twin-glass-towers.glb'
bpy.ops.export_scene.gltf(filepath=str(glb),export_format='GLB',use_selection=True,
    export_yup=True,export_apply=True,export_cameras=False,export_lights=False,
    export_extras=True,export_materials='EXPORT',export_animations=False)
bpy.ops.wm.save_as_mainfile(filepath=str(SOURCE / 'twin-glass-towers.blend'),compress=True)
triangles = sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes)
report = {
    'generator': 'Blender '+bpy.app.version_string,
    'units': 'metres (inferred)', 'triangles': triangles, 'meshObjects':len(meshes),
    'materials':len(MATERIALS),'glbBytes':glb.stat().st_size,
    'sourceTriangles':4351840,'sourceBytes':172082328,
    'towerWidth':WIDTH,'towerDepth':DEPTH,'towerTop':HIGH_ROOF,'facadeFloors':FLOORS,
    'notes':['Reference silhouette reconstructed from supplied Meshy model; no survey or original design drawings.',
             'Panel divisions and service louvres are interpreted architectural details.',
             'No source geometry, baked textures, cameras, lights or environment maps in GLB.']}
(OUT / 'model-info.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print('MODEL_REPORT',json.dumps(report),flush=True)
if args.render:
    scene.render.filepath = str(SOURCE / 'preview.png')
    bpy.ops.render.render(write_still=True)
