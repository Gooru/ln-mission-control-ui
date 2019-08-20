import { Component, Vue, Prop } from 'vue-property-decorator';


@Component({
    name: 'profile-gallery',
})
export default class ProfileGallery extends Vue {
    private slide: any = 0;
    private sliding: any = null;
    @Prop()
    private profileData: any;
    @Prop()
    private galleryData: any;
    private onSlideStart(slide: any) {
        this.sliding = true;
    }
    private onSlideEnd(slide: any) {
        this.sliding = false;
    }
    private onClickPopp(event: any) {
        this.$emit('closePopUp', false);
    }
}
