import { Vue } from 'vue-property-decorator';

Vue.filter('avatarText', (value: any) => {
    let avatar = '';
    (value.split(' ')).map((words: any) => {
        avatar += words.toString().charAt(0).toUpperCase();
    });
    return avatar.substr(0, 3);
});

Vue.filter('contentFormator',  (value: any, text: string) => {
    const arrayString = value.split('_') || '';
    const removeString = arrayString.filter((item: string) => item !== text);
    return  removeString.join(' ');
});
