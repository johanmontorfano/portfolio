import { PageScript as PageScript1 } from "../components/scene-1";
import { PageScript as PageScript2 } from "../components/scene-2";
import { PageScript as PageScript3 } from "../components/scene-3";
import { PageScript as PageScript4 } from "../components/scene-4";


export const _ = () => (
  <div>
    {
      <PageScript1 />
    }
    
    {
      <PageScript2 />
    }
    
    {
      <PageScript3 />
    }
    
    {
      <PageScript4 />
    }
  </div>
);
