export const LOAD_LOCALIZATION = 'LOAD_LOCALIZATION';
export function loadLocalization(localizationCode) {
    try {
        let localizationSet = require('../../consts/locale/index');
        if(localizationSet.hasOwnProperty(localizationCode)) {
            return {
                type: LOAD_LOCALIZATION,
                success: true,
                localizationData: localizationSet[localizationCode]
            }
        } else {
            return {
                type: LOAD_LOCALIZATION,
                success: false,
                localizationData: {}
            }
        }
    } catch(exception) {
        console.error(new Error(exception));
    }
}