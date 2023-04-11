import './assets/style/layouts.scss';

import {
  createApp,
  reactive,
} from 'vue';

import Maska from 'maska';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import AutoComplete from 'primevue/autocomplete';
import Avatar from 'primevue/avatar';
import BadgeDirective from 'primevue/badgedirective';
import Breadcrumb from 'primevue/breadcrumb';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Chart from 'primevue/chart';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Column from 'primevue/column';
import ColumnGroup
  from 'primevue/columngroup';     //optional for column grouping
// PrimeVue components
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Knob from 'primevue/knob';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import PanelMenu from 'primevue/panelmenu';
import Password from 'primevue/password';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import Rating from 'primevue/rating';
import Ripple from 'primevue/ripple';
import Row from 'primevue/row';
import ScrollPanel from 'primevue/scrollpanel';
import SelectButton from 'primevue/selectbutton';
import Sidebar from 'primevue/sidebar';
import Skeleton from 'primevue/skeleton';
import Slider from 'primevue/slider';
import SplitButton from 'primevue/splitbutton';
import Steps from 'primevue/steps';
import TabMenu from 'primevue/tabmenu';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ToggleButton from 'primevue/togglebutton';
import Toolbar from 'primevue/toolbar';
import Tooltip from 'primevue/tooltip';
import TreeSelect from 'primevue/treeselect';
import JsonExcel from 'vue-json-excel3';
import VueApexCharts from 'vue3-apexcharts';

import App from './App.vue';
import router from './router';
import store from './store/index';

const app = createApp(App)

app.use(PrimeVue, { ripple: true, inputStyle: 'outlined' })
app.use(ToastService);
app.use(store)
app.use(router)
app.use(Maska)
app.use(ConfirmationService)
app.use(VueApexCharts);

// app.use(Vuelidate)




// Global variables
window.addEventListener("resize", (event) => {
    app.config.globalProperties.SCREEN_WIDTH = event.currentTarget.innerWidth;
    app.config.globalProperties.SCREEN_HEIGHT = event.currentTarget.innerHeight;

})
addEventListener('beforeunload', (event) => { 
    console.log(event);
    window.stop()
});
app.config.globalProperties.SCREEN_WIDTH = window.innerWidth;
app.config.globalProperties.SCREEN_HEIGHT = window.innerHeight;
app.config.globalProperties.$appState = reactive({ theme: 'lara-light-blue', darkTheme: false });






app.directive('ripple', Ripple);
// app.directive('code', CodeHighlight);
app.directive('Badge', BadgeDirective);
app.directive('tooltip', Tooltip);
// app.directive('styleclass', StyleClass);

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('Breadcrumb', Breadcrumb);
app.component('Toolbar', Toolbar);
app.component('SplitButton', SplitButton);




app.component('Menu', Menu);
app.component('Avatar', Avatar);
app.component('Badge', BadgeDirective);
app.component('Chart', Chart);
app.component('Divider', Divider);
app.component('Tag', Tag);
app.component('Dropdown', Dropdown);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Tooltip', Tooltip);
app.component('OverlayPanel', OverlayPanel);
app.component('Calendar', Calendar);
app.component('InputNumber', InputNumber);
app.component('Password', Password);
app.component('Toast', Toast);
app.component('Galleria', Galleria);
app.component('Image', Image);
app.component('Menubar', Menubar);
app.component('AutoComplete', AutoComplete);
app.component('Sidebar', Sidebar);
app.component('Slider', Slider);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Steps', Steps);
app.component('Textarea', Textarea);
app.component('Skeleton', Skeleton);
app.component('Knob', Knob);
app.component('ContextMenu', ContextMenu);
app.component('Paginator', Paginator);
app.component('ScrollPanel', ScrollPanel);
app.component('ProgressSpinner', ProgressSpinner);
app.component('SelectButton', SelectButton);
app.component('MultiSelect', MultiSelect);
app.component('Chip', Chip);
app.component('Message', Message);
app.component('Checkbox', Checkbox);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Fieldset', Fieldset);
app.component('Panel', Panel);
app.component('TreeSelect', TreeSelect);
app.component("downloadExcel", JsonExcel);
app.component("PanelMenu", PanelMenu);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("TabMenu", TabMenu);
app.component("Rating", Rating);
app.component("ProgressBar", ProgressBar);
app.component("FileUpload", FileUpload);
app.component("ToggleButton", ToggleButton);











































app.mount('#app')
