import { http } from '@/providers/apis/http';
import { statsSerializer } from '@/providers/serializers/stats/stats';
import { CountryModel } from '@/models/stats/country';

/**
 *
 * This Stats API Provider is responsible for all stats related API's.
 *
 */
export class StatsAPI {

    private static INSTANCE = new StatsAPI();

    static get instance() {
        return this.INSTANCE;
    }

    private statsNamespace: string = 'api/missioncontrol/v1/stats';

    public getCountries(): Promise<CountryModel[]> {
        const endpoint = `${this.statsNamespace}/countries`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return statsSerializer.countriesModelSerializer(response.data);
        });
    }
}

export const statsAPI = StatsAPI.instance;
