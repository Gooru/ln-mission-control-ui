import { Component, Vue, Prop } from 'vue-property-decorator';


@Component({
    name: 'profile-gallery',
})
export default class ProfileGallery extends Vue {

    // ----------------------------------------------
    // Properties

    /**
     * Initial setup for carousel slide
     */

    private slide: any = 0;

    /**
     * Initial setup for carousel slide
     */

    private sliding: any = null;

    /**
     * Maintains partner profile page data
     */

    @Prop()
    private partnerProfile: any;

    /**
     * Maintains gallery data for images or videos
     */

    @Prop()
    private galleryData: any;

    // -------------------------------------
    // Hooks

    // ------------------------------------
    // Actions

    private onSlideStart(slide: any) {
        this.sliding = true;
    }

    private onSlideEnd(slide: any) {
        this.sliding = false;
    }
    // ---------------------------------------
    // Methods

}
