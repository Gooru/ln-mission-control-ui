import { GroupHierarchy } from '@/models/groups/hierarchy';

class GroupsSerializer {
    public static instance = new GroupsSerializer();

    /**
     * @function serializeUserHierarchies
     * @param payload
     * @returns {GroupHierarchy[]}
     * Method to serializer groups hierarchies data
     */
    public serializeUserHierarchies(payload: any): GroupHierarchy[] {
        const serializedGroupsHierarchies: GroupHierarchy[] = [];
        if (payload && payload.hierarchies) {
            const groupHierarchies = payload.hierarchies || [];
            serializedGroupsHierarchies.push(
                groupHierarchies.map((groupHierarchy: any) => {
                const serializedGroupsHierarchy: GroupHierarchy = {
                    id: groupHierarchy.id,
                    name: groupHierarchy.name,
                    description: groupHierarchy.description,
                    tenants: groupHierarchy.tenants,
                };
                return serializedGroupsHierarchy;
            }),
            );
        }
        return serializedGroupsHierarchies;
    }
}

export const groupsSerializer = GroupsSerializer.instance;
