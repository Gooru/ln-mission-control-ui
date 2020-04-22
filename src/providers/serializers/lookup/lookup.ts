import { Vue } from 'vue-property-decorator';
import { CENTURY_SKILLS_GROUPS } from '@/utils/constants';

/**
 * Serialize look up API datas
 */
export class LookupSerializer extends Vue {


    private static INSTANCE = new LookupSerializer();


    static get instance() {
        return this.INSTANCE;
    }


    public normalizeReadAudiences(payload: any) {
        const normalizedAudiences: any = [];
        if (Array.isArray(payload.audience)) {
            payload.audience.map((audience: any) => {
                const audienceData = {
                    label: audience.label,
                    sequence_id: audience.sequence_id,
                    id: audience.id,
                };
                normalizedAudiences.push(audienceData);
            });
        }
        return normalizedAudiences;
    }

    public normalizeReadLicenses(payload: any) {
        const normalizedLicenses: any = [];
        const licenses = payload.license;
        if (Array.isArray(licenses)) {
            licenses.map((license) => {
                const licenseData = {
                    label: license.label,
                    sequence_id: license.sequence_id,
                    id: license.id,
                    code: license.info ? license.info.license.code || '' : '',
                };
                normalizedLicenses.push(licenseData);
            });
        }
        return normalizedLicenses;
    }

    public normalizeReadDepthOfKnowledgeItems(payload: any) {
        const normalizedDok: any = [];
        const dokItems = payload.depth_of_knowledge;
        if (Array.isArray(dokItems)) {
            dokItems.map((dok) => {
                const dokData = {
                    label: dok.label,
                    sequence_id: dok.sequence_id,
                    id: dok.id,
                };
                normalizedDok.push(dokData);
            });
        }
        return normalizedDok;
    }

    /**
     * Normalize the century skills endpoint response
     * @param payload The endpoint response in JSON format
     * @returns {CenturySkill[]} a list of century skill model objects
     */
    public normalizeCenturySkills(payload: any) {
        const centurySkills = payload['21_century_skills'];
        const cognitiveSkillsGroup =
            centurySkills[CENTURY_SKILLS_GROUPS.KEY_COGNITIVE_SKILLS_AND_STRATEGIES];
        const contentSkillsGroup =
            centurySkills[CENTURY_SKILLS_GROUPS.KEY_CONTENT_KNOWLEDGE];
        const learningSkillsGroup =
            centurySkills[CENTURY_SKILLS_GROUPS.KEY_LEARNING_SKILLS_AND_TECHNIQUES];
        const normalizedCenturySkills: any = [];

        cognitiveSkillsGroup.forEach((cognitiveSkill: any) => {
            normalizedCenturySkills.push(
                this.normalizeReadCenturySkillInfo(
                    cognitiveSkill,
                    CENTURY_SKILLS_GROUPS.KEY_COGNITIVE_SKILLS_AND_STRATEGIES,
                ),
            );
        });

        contentSkillsGroup.forEach((contentSkill: any) => {
            normalizedCenturySkills.push(
                this.normalizeReadCenturySkillInfo(
                    contentSkill,
                    CENTURY_SKILLS_GROUPS.KEY_CONTENT_KNOWLEDGE,
                ),
            );
        });

        learningSkillsGroup.forEach((learningSkill: any) => {
            normalizedCenturySkills.push(
                this.normalizeReadCenturySkillInfo(
                    learningSkill,
                    CENTURY_SKILLS_GROUPS.KEY_LEARNING_SKILLS_AND_TECHNIQUES,
                ),
            );
        });

        return normalizedCenturySkills;
    }

    /**
     * Normalize the Read Century Skill info endpoint response
     *
     * @param payload is the endpoint response in JSON format
     * @param {String} group of century skill
     * @returns {CenturySkillModel} a centurySkill model object
     */
    public normalizeReadCenturySkillInfo(payload: any, group: any = null) {
        return {
            id: payload.id,
            label: payload.label,
            hewlettDeepLearningModel: payload.hewlett_deep_learning_model,
            conleyFourKeysModel: payload.conley_four_keys_model,
            p21FrameworkModel: payload.p21_framework_model,
            nationalResearchCenterModel: payload.national_research_center_model,
            group,
        };
    }

}

export const lookupSerializer = LookupSerializer.instance;
