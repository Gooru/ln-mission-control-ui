export class PerformanceSerializer {

    private static INSTANCE = new PerformanceSerializer();

    static get instance() {
        return this.INSTANCE;
    }

    public serializeState(states: any) {
        const serializer = this;
        const statesList = states.data ? states : {};
        return statesList;
    }

    public serializeDistrict(district: any) {
        const serializer = this;
        const districtList = district.data ? district : {};
        return districtList;
    }

    public serializeSchool(school: any) {
        const serializer = this;
        const schoolList = school.data ? school : {};
        return schoolList;
    }

    public serializeClass(classes: any) {
        const serializer = this;
        const classList = classes.data ? classes : {};
        return classList;
   }

   public serializeClassRooms(classRooms: any) {
        const serializer = this;
        const classRoomList = classRooms.data ? classRooms.data : [];
        return classRoomList;
   }



}

export const performanceSerializer = PerformanceSerializer.instance;
