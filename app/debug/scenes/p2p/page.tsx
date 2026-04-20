import { CR_QUALITIES, P2P_QUALITIES, QualitiesShowcase } from "@/components/scenes/with_components/p2p";

export default function Page() {
    return <div>
        <QualitiesShowcase qualities={P2P_QUALITIES} />
        <QualitiesShowcase qualities={CR_QUALITIES} />
    </div>
}
