import { ResearchModel } from '@/models/research/research';

/**
 * Serializer help to serialize the research API's
 */
export class ResearchSerializer {

    private static INSTANCE = new ResearchSerializer();

    static get instance() {
        return this.INSTANCE;
    }

    /**
     * serializeResearchProjects  help to serialize research projects api data's
     * @param payload
     */
    public serializeResearchProjects(payload: any): ResearchModel[] {
        const results: ResearchModel[] = [];
        const researchList = payload.researchProjects ? payload.researchProjects : [];
        if (researchList.length) {
            researchList.map((research: any) => {
                const projectDetails: ResearchModel = {
                    category: research.category,
                    data: research.data,
                    description: research.description,
                    id: research.id,
                    publications: research.publications,
                    summary: research.summary,
                    teams: research.teams,
                    title: research.title,
                };
                results.push(projectDetails);
            });
        }
        return results;
    }

}

export const researchSerializer = ResearchSerializer.instance;
