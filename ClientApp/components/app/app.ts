import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import NavMenuComponent from '../navmenu/navmenu.vue';

@Component({
    components: {
        MenuComponent: NavMenuComponent
    }
})
export default class AppComponent extends Vue {
}
