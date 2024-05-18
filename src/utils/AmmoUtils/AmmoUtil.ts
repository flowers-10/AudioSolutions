import Ammo from '../../../static/ammo/ammo';

const AmmoUtil = {
    Ammo: <typeof Ammo>{},
    Init(): Promise<void> {
        return new Promise(ok => {
            Ammo<typeof Ammo>().then(Ammo => {
                // (globalThis as any).Ammo = Ammo;
                AmmoUtil.Ammo = Ammo;
                ok();
            })
        })
    }
}
export default AmmoUtil;