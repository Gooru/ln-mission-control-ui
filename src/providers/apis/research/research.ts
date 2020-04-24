import { http } from '../http';
import { researchSerializer } from '@/providers/serializers/research/research';

/**
 * research API service used to handled the API calls
 */
export class ResearchAPI {
    private static INSTANCE = new ResearchAPI();

    static get instance() {
        return this.INSTANCE;
    }

    private namespace: string = 'api/missioncontrol/v1';

    /**
     * used to fetch the research project lists
     */
    public fetchProjects() {
        const endPoint =  `${this.namespace}/research/projects`;
        const headers = http.getTokenHeaders();
        return http.get(endPoint, headers).then((response) => {
            return researchSerializer.serializeResearchProjects(response.data);
        });
    }


}

export const researchAPI = ResearchAPI.instance;
