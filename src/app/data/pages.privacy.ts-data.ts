import { UseLang } from '../../modules/doc/lang';
import { PageElement } from './types';

export const PageData: PageElement = {
    PageData: {
        className: "scene",
        name: "privacy-page"
    },
    PageTexts: {
        intro: UseLang({
            US: "This website uses the Google Analytics API to make traffic analysis. It's useful to know more about how the user uses the website and improves this experience.",
            FR: "Ce site utilise l'API Google Analytics pour faire de l'analyse de traffic. C'est utile pour en savoir plus sur la manière dont l'utilisateur se sert du site pour améliorer son expérience."
        }),
        subtitle: UseLang({
            US: "There is a list of some data collected with the API.",
            FR: "Voici une liste des données collectées avec l'API."
        }),
        disableButton: UseLang({US: "Disable Analytics for this session", FR: "Désactiver Analytics pour cette session"}),
        disabledButton: UseLang({US: "Analytics disabled !", FR: "Analytics désactivés !"})
    },
    PageTables: {
        list: [
            UseLang({US: "Device resolution", FR: "Résolution de l'écran"}),
            UseLang({US: "Device OS", FR: "SE de l'appareil"}),
            UseLang({US: "Device country location", FR: "Pays de l'appareil"}),
            UseLang({US: "Device city location", FR: "Ville de l'appareil"}),
            UseLang({US: "Device model", FR: "Modèle de l'appareil"}),
            UseLang({US: "Navigator name", FR: "Nom du navigateur"}),
            UseLang({Us: "User language", FR: "Langue de l'utilisateur"}),
            UseLang({US: "Activity on the website", FR: "Activité sur le site"}),
            UseLang({US: "Time spend on the website", FR: "Temps dépensé sur le site"}),
            UseLang({US: "Website performances", FR: "Performances du site"}),
            UseLang({US: "Website errors", FR: "Erreurs du site"})
        ]
    }
}