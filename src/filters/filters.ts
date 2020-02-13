import { Vue } from 'vue-property-decorator';

Vue.filter('avatarText', (value: any) => {
    let avatar = '';
    (value.split(' ')).map((words: any) => {
        avatar += words.toString().charAt(0).toUpperCase();
    });
    return avatar.substr(0, 3);
});
