export interface TaxonomyModel {
    id?: string;
    code?: string;
    title?: string;
    parentTitle?: string;
    description?: string;
    frameworkCode?: string;
    taxonomyLevel?: string | boolean;
}
