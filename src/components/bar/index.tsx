import { SharedData } from "../../app/data/pages.any.ts-data";
import { UseLang } from "../../modules/doc/lang";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { EditJSONObject } from "../../modules/var/edit-json-object";
import { UseNonUndefined } from "../../modules/var/non-undefined-content";
import { ResponsiveLink } from "../responsive/responsive-link";
import { ResponsiveText } from "../responsive/responsive-text";

const DefinedBottomBarStyle = {
  width: "80%",
  backgroundColor: "whitesmoke",
  padding: "2%",
  paddingLeft: "10%",
  paddingRight: "10%",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr",
};

const Translates = {
  HomeLink: UseLang({ FR: "Acceuil", US: "Home" }),
  ContactEntry: UseLang({ FR: "Me contacter", US: "Contact me" }),
  ContactEmailEntry: UseLang({ FR: "Par mail", US: "Via mail" }),
  ContactPhoneEntry: UseLang({
    FR: "Par téléphone (+33)",
    US: "Via phone (+33)",
  }),
  MoreGithubEntry: UseLang({
    FR: "Voir le code sur GitHub",
    US: "See the code on GitHub",
  }),
  PrivacyLink: UseLang({
    FR: "Confidentialité",
    US: "Privacy"
  })
};

export const BottomBar = () => {
  const VerifiedPageValues = UseNonUndefined(SharedData.PageValues);

  return (
    <ResponsiveComponent
      style={DefinedBottomBarStyle}
      mobile_style={EditJSONObject(DefinedBottomBarStyle, [
        { edit: "gridTemplateColumns", value: "1fr" },
        { edit: "gridTemplateRows", value: "1fr 1fr 1fr" },
      ])}
    >
      <div>
        <ResponsiveText>Pages</ResponsiveText>
        <ul>
          <li>
            <ResponsiveLink tiny redirectTo="/">
              {Translates.HomeLink}
            </ResponsiveLink>
          </li>
          <li>
            <ResponsiveLink tiny redirectTo="/cv">
              Curriculum Vitae
            </ResponsiveLink>
          </li>
          <li>
            <ResponsiveLink tiny redirectTo="/privacy">
              {Translates.PrivacyLink}
            </ResponsiveLink>
          </li>
        </ul>
      </div>
      <div>
        <ResponsiveText>{Translates.ContactEntry}</ResponsiveText>
        <ul>
          <li>
            <ResponsiveLink tiny redirectTo={"mailto:" + VerifiedPageValues["ionosEmail"]}>
              {Translates.ContactEmailEntry}
            </ResponsiveLink>
          </li>
          <li>
            <ResponsiveLink tiny redirectTo="tel:+33763427433">
              {Translates.ContactPhoneEntry}
            </ResponsiveLink>
          </li>
        </ul>
      </div>
      <div>
        <ResponsiveText>More</ResponsiveText>
        <ul>
          <li>
            <ResponsiveLink
              tiny
              redirectTo="https://github.com/franndjoo/portfolio-v3"
            >
              {Translates.MoreGithubEntry}
            </ResponsiveLink>
          </li>
          <li>
            <ResponsiveLink tiny redirectTo="/console">
              Console
            </ResponsiveLink>
          </li>
        </ul>
      </div>
    </ResponsiveComponent>
  );
};
