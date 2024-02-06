<template>
  <div class="grid">
    <MenuSidebar
        :formFields="formFields"
        :formData="formData"
        v-model:visible="visible"
        @save="onSave">
    </MenuSidebar>

    <Dialog v-model:visible="visibleCantDeleteId" modal header="Header" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <template #header>
        <div class="inline-flex align-items-center justify-content-center gap-2">
          <span class="font-bold white-space-nowrap">Unable to Delete ID</span>
        </div>
      </template>
      <p class="m-0">
        Tracking and auditing are essential functions that enable control and logging of system changes. Unique
        identifiers (IDs) play a crucial role in this process, facilitating effective monitoring of operations and the
        ability to conduct audits to ensure data security and integrity. Deleting IDs can disrupt this critical control
        mechanism.
      </p>
      <template #footer>
        <Button label="Ok" icon="pi pi-check" @click="visibleCantDeleteId = false" autofocus/>
      </template>
    </Dialog>
    <Menu ref="menuModule" id="config_menu" :model="itemsModule" popup/>
    <Menu ref="menuEntity" id="config_menu" :model="itemsEntity" popup/>
    <Menu ref="menuColumn" id="config_menu" :model="itemsColumn" popup/>


    <div class="flex overflow-hidden">
      <div class="align-items-center mr-3"><h2>Editor</h2></div>
      <div class="flex-none flex align-items-center">
        <Button severity="secondary" style="border: none" outlined rounded type="button" icon="pi pi-save"
                aria-haspopup="true" aria-controls="overlay_menu"/>
      </div>
      <div class="flex-none flex align-items-center">
        <Button severity="secondary" @click="onAddModule()" style="border: none" outlined rounded type="button"
                icon="pi pi-plus" aria-haspopup="true" aria-controls="overlay_menu"/>
      </div>
    </div>
    <Divider/>
    <div class="xl:col-4 lg:col-6 md:col-6 sm:col-12 col-12" v-for="(module, moduleIndex) in modules">
      <div class="card">
        <Fieldset :collapsed="moduleCollapsed[moduleIndex] ?? false">
          <template #legend="{ toggle }">
            <div class="flex align-items-center gap-2 px-2">
              <span class="font-bold">{{ module.name }}</span>
              <div class="ml-4">
                <Button class="entity_block_editor_butt" icon="pi pi-cog" @click="toggleModule($event, moduleIndex)"
                        text rounded aria-label="Settings" size="small" severity="secondary"/>
                <Button class="entity_block_editor_butt"
                        :icon="moduleCollapsed[moduleIndex] === true ? 'pi pi-plus' : 'pi pi-minus'"
                        @click="toggleModuleCollapsed($event, moduleIndex)" text rounded aria-label="Toggle"
                        severity="secondary" size="small"/>
              </div>
            </div>
          </template>
          <div class="grid">
            <div class="col-11 p-0 h-full">
              <div class="card" v-for="(entity, entityIndex) in module.entity">
                <Panel ref="refEntity" toggleable collapsed class="mb-4">
                  <template #header>
                    <div class="align-items-center gap-2">
                      <div class="font-bold">{{ entity.name }}</div>
                      <div class="entity-group-access">{{ entity.group }}</div>
                    </div>
                  </template>
                  <template #footer>
                    <div class="flex flex-wrap align-items-center justify-content-between gap-3">
                      <span class="p-text-secondary" style="font-size: 11px">{{ entity.updatedAt }}</span>
                    </div>
                  </template>
                  <template #icons>
                    <Button class="entity_block_editor_butt" icon="pi pi-cog"
                            @click="toggleEntity($event, moduleIndex, entityIndex)" text rounded aria-label="Settings"
                            size="small" severity="secondary"/>
                  </template>
                  <template #togglericon="{collapsed}">
                    <Button class="entity_block_editor_butt" @click="showEntity($event, collapsed)" :icon="collapsed === true ? 'pi pi-plus' : 'pi pi-minus'"
                            text
                            rounded aria-label="Settings" size="small" severity="secondary"/>
                  </template>
                  <div  ref="refColumn" :data-entity-index="entityIndex" :data-module-index="moduleIndex" style="position: relative" class="entity-column mb-2"
                       v-for="(column, columnIndex) in entity.column">
                    <div class="flex">
                      <div class="flex-grow-1 flex align-items-center">
                        <div class="entity-name mb-1">{{ column.name }} ({{ column.type }})
                        </div>
                      </div>
                      <div class="flex-none flex">
                        <Button class="p-panel-header-icon p-link entity_block_editor_butt" icon="pi pi-cog"
                                @click="toggleColumn($event, moduleIndex, entityIndex, columnIndex)" text rounded
                                aria-label="Settings" size="small" severity="secondary"/>
                      </div>
                    </div>
                    <!--                <Button class="p-panel-header-icon p-link mr-2 absolute right-0 top-0" icon="pi pi-cog" @click="toggleColumn($event, moduleIndex, entityIndex, columnIndex)" text rounded aria-label="Settings" size="small" />-->
                    <Accordion :multiple="true">
                      <AccordionTab>
                        <template #header>
                          access
                        </template>
                        <div v-for="(group, type) in column.group">
                          <div v-if="group.length > 0" class="column-group-access">{{ type }}: <span>{{ group }}</span>
                          </div>
                        </div>
                      </AccordionTab>
                      <AccordionTab v-if="Object.keys(column.validator).length > 0">
                        <template #header>
                          validator
                        </template>
                        <div>
                          <div v-for="(validator, key) in column.validator">
                            <div class="column-group-access">{{ key }}
                              <span v-if="!validator !== true">
                            : {{ validator }}
                            </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTab>
                    </Accordion>
                  </div>
                </Panel>
              </div>
            </div>
            <div ref="refArrowBlock" class="col-1 p-0">
              <!-- Тут отрисовываем напровляющие стрелки для связей -->
            </div>
          </div>
        </Fieldset>
      </div>
    </div>
  </div>

</template>

<script setup>
import Fieldset from 'primevue/fieldset';
import Panel from 'primevue/panel';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import MenuSidebar from './MenuSidebar.vue';
import {useConfirm} from "primevue/useconfirm";
import AddEditModule from "@/assets/AddEditModule.json"
import AddEditEntity from "@/assets/AddEditEntity.json"
import AddEditColumn from "@/assets/AddEditColumn.json"
import { SVG } from '@svgdotjs/svg.js'

import {ref, onMounted} from 'vue';
//
const refArrowBlock = ref(null);
const refEntity = ref(null);
const refColumn = ref(null);

/** if hidden entity get entity position **/
function getEntityOrColumnRect(div) {
  let columnRect = div.getBoundingClientRect()

  if (columnRect.top <= 0) {
    return div.closest('.card').getBoundingClientRect()
  }

  return columnRect
}

function drawLine(line, divFirst, div1Rect, div2Rect, marginLeft, marginTop, animate) {
  const marginTopOnFirstBlock = divFirst.top;
  marginTop =  div1Rect.top - marginTopOnFirstBlock + marginTop

  const startPoint = { x: 0, y: marginTop};
  const bendPoint1 = { x: marginLeft, y: marginTop };
  const bendPoint2 = { x: marginLeft, y: div2Rect.top - div1Rect.top + marginTop + 1};
  const endPoint = { x: 0, y: div2Rect.top - div1Rect.top  + marginTop + 1};

  // Draw line with bends
  let polylineCoordinates = [[startPoint.x, startPoint.y], [bendPoint1.x, bendPoint1.y], [bendPoint2.x, bendPoint2.y], [endPoint.x, endPoint.y]]
  line.animate(animate, '<>').plot(polylineCoordinates);
  line.show()
  /** @todo при развертывание меняем координаты **/
  // setTimeout(() => {
  //   polylineCoordinates[2][1] = 300;
  //   polylineCoordinates[3][1] = 300;
  //   draw.size(el.clientWidth, el.clientHeight)
  //   line.animate(2000, '<>').plot(polylineCoordinates);
  // }, 2000)
}
let draw = null;
const lines = [];
function showLines(index) {
  // debugger
  const el = refArrowBlock.value[0].closest('.grid').firstChild

  draw.size(30, el.clientHeight)

  // Need for count
  const firstPanelSize = getEntityOrColumnRect(refColumn.value[0].closest('.card>.p-panel')) //

  const div1 = getEntityOrColumnRect(refColumn.value[0])
  const div2 = getEntityOrColumnRect(refColumn.value[5])

  // debugger
  const marginLeft = 15;
  const marginTop = 30;


  // debugger
  if (lines[index] === undefined) {
    lines[index] = draw.polyline([[0, marginLeft], [0, marginLeft], [0, marginLeft], [0, marginLeft]]).fill('none')
        .stroke({color: '#8a8a8a', width: 0.5});
  }

  drawLine(lines[index], firstPanelSize, div1, div2, marginLeft, marginTop, 400);
}

function showEntity(e, collapsed) {
  if (lines[0] !== undefined) {
    // lines[0].hide()
    // debugger
  }
  // showLines(0)
  // showLines(0)
  // setTimeout(showLines, 100, [0])
  // setTimeout(showLines, 0, [0])
  setTimeout(showLines, 670, [0])
}

onMounted(() => {
  const el = refArrowBlock.value[0]
  draw = SVG().addTo(el).size(el.clientWidth, el.clientHeight)
  // showLines()
})

const menuModule = ref(null);
const menuEntity = ref(null);
const menuColumn = ref(null);

const formFields = ref(null);
let visible = ref(false);
let visibleCantDeleteId = ref(false);
let formData = ref(null);

const confirm = useConfirm();
const moduleCollapsed = ref([]);

function toggleModuleCollapsed(e, index) {
  moduleCollapsed.value[index] = moduleCollapsed.value[index] === undefined ? true : !moduleCollapsed.value[index]
}

function onSave(newData, oldData) {
  let type = newData['type']
  let moduleIndex = newData['moduleIndex']
  let entityIndex = newData['entityIndex']
  let columnIndex = newData['columnIndex']
  let action = newData['action']
  let originalObject = null;
  if (type === 'module' && action === 'update') {
    originalObject = modules.value[moduleIndex];
  } else if (type === 'entity' && action === 'update') {
    originalObject = modules.value[moduleIndex]['entity'][entityIndex];
    newData['data']['updatedAt'] = getCurrentDateTime()
  } else if (type === 'column' && action === 'update') {
    originalObject = modules.value[moduleIndex]['entity'][entityIndex]['column'][columnIndex];
    modules.value[moduleIndex]['entity'][entityIndex]['updatedAt'] = getCurrentDateTime()
  }

  if (action === 'add' && type === 'module') {
    modules.value.push(newData['data']);
    visible.value = false;
    return;
  }

  if (action === 'add' && type === 'entity') {
    modules.value[moduleIndex]['entity'].push(newData['data']);
    visible.value = false;
    return;
  }

  if (action === 'add' && type === 'column') {
    modules.value[moduleIndex]['entity'][entityIndex]['column'].push(newData['data']);
    modules.value[moduleIndex]['entity'][entityIndex]['updatedAt'] = getCurrentDateTime()
    visible.value = false;
    return;
  }

  if (originalObject === null) {
    throw new Error('originalObject is null cause type is ' + type);
  }

  let data = newData['data'];
  for (let key in data) {
    if (originalObject.hasOwnProperty(key)) {
      originalObject[key] = data[key];
    }
  }

  visible.value = false;
}

function onAddModule() {
  let module = {
    // Название модуля
    'name': '',
    'entity': []
  };

  formData.value = {
    'type': 'module',
    'action': 'add',
    'data': module
  };
  formFields.value = AddEditModule;
  visible.value = true;
}

const itemsModule = ref([
  {
    label: 'Edit module',
    icon: 'pi pi-pencil',
    command: () => {
      formData.value = {
        'type': 'module',
        'action': 'update',
        'moduleIndex': localStorage.moduleIndex,
        'data': JSON.parse(JSON.stringify(modules.value[localStorage.moduleIndex]))
      };
      formFields.value = AddEditModule;
      visible.value = true;
    }
  },
  {
    label: 'Add entity',
    icon: 'pi pi-plus',
    command: () => {
      const entity = {
        // Название сущности
        'name': '',
        'group': [],
        'column': [],
        'validator': {
          Cascade: null,
        },
        'updatedAt': getCurrentDateTime()
      }

      formData.value = {
        'type': 'entity',
        'action': 'add',
        'moduleIndex': localStorage.moduleIndex,
        'data': entity
      };
      formFields.value = AddEditEntity;
      visible.value = true;
    }
  },
  {
    separator: true
  },
  {
    label: 'Delete module',
    icon: 'pi pi-trash',
    command: () => {
      confirm.require({
        message: 'Are you sure you want to delete module?',
        header: 'Confirmation delete module',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          let moduleIndex = parseInt(localStorage.moduleIndex);

          modules.value.splice(moduleIndex, 1);
        },
      });
    }
  },
]);

const itemsEntity = ref([
  {
    label: 'Edit entity',
    icon: 'pi pi-pencil',
    command: () => {
      formData.value = {
        'type': 'entity',
        'action': 'update',
        'moduleIndex': localStorage.moduleIndex,
        'entityIndex': localStorage.entityIndex,
        'data': JSON.parse(JSON.stringify(modules.value[localStorage.moduleIndex].entity[localStorage.entityIndex]))
      };
      formFields.value = AddEditEntity;
      visible.value = true;
    }
  },
  {
    label: 'Add column',
    icon: 'pi pi-plus',
    command: () => {
      let entity = modules.value[localStorage.moduleIndex]['entity'][localStorage.entityIndex];
      let accessInput = AddEditColumn.filter(x => {
        return x.type === 'AccessInput'
      })
      if (accessInput.length > 0) {
        accessInput[0]['props']['groups'] = entity['group']
      }
      const column = {
        'name': '',
        'type': null,
        'validator': {},
        'group': {
          GET: [],
          POST: [],
          PUT: [],
          DELETE: [],
        },
      }

      formData.value = {
        'type': 'column',
        'action': 'add',
        'moduleIndex': localStorage.moduleIndex,
        'entityIndex': localStorage.entityIndex,
        'data': column
      };
      formFields.value = AddEditColumn;
      visible.value = true;
    }
  },
  {
    separator: true
  },
  {
    label: 'Delete entity',
    icon: 'pi pi-trash',
    command: () => {
      confirm.require({
        message: 'Are you sure you want to delete entity?',
        header: 'Confirmation delete module',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          let moduleIndex = parseInt(localStorage.moduleIndex);
          let entityIndex = parseInt(localStorage.entityIndex);

          modules.value[moduleIndex]['entity'].splice(entityIndex, 1);
        },
      });
    }
  },
]);

const itemsColumn = ref([
  {
    label: 'Edit column',
    icon: 'pi pi-pencil',
    command: () => {
      let entity = modules.value[localStorage.moduleIndex]['entity'][localStorage.entityIndex];
      let data = JSON.parse(JSON.stringify(entity['column'][localStorage.columnIndex]));
      let accessInput = AddEditColumn.filter(x => {
        return x.type === 'AccessInput'
      })
      if (accessInput.length > 0) {
        accessInput[0]['props']['groups'] = entity['group']
      }
      formData.value = {
        'type': 'column',
        'action': 'update',
        'moduleIndex': localStorage.moduleIndex,
        'entityIndex': localStorage.entityIndex,
        'columnIndex': localStorage.columnIndex,
        'data': data
      };
      formFields.value = AddEditColumn
      formFields.value.forEach(i => {
        if (i.model === 'name' || i.model === 'type') {
          i.props.disabled = data.name === 'id'
        }
      });

      visible.value = true;
    }
  },
  {
    separator: true
  },
  {
    label: 'Delete column',
    icon: 'pi pi-trash',
    command: () => {
      let moduleIndex = parseInt(localStorage.moduleIndex);
      let entityIndex = parseInt(localStorage.entityIndex);
      let columnIndex = parseInt(localStorage.columnIndex);

      if (modules.value[moduleIndex]['entity'][entityIndex]['column'][columnIndex]['name'] === 'id') {
        visibleCantDeleteId.value = true;
        return;
      }

      confirm.require({
        message: 'Are you sure you want to delete column?',
        header: 'Confirmation delete column',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          modules.value[moduleIndex]['entity'][entityIndex]['column'].splice(columnIndex, 1);
        },
      });
    }
  },
]);

const toggleModule = (event, moduleIndex) => {
  localStorage.moduleIndex = moduleIndex;

  menuModule.value.toggle(event);
};
const toggleEntity = (event, moduleIndex, entityIndex) => {
  localStorage.moduleIndex = moduleIndex;
  localStorage.entityIndex = entityIndex;

  menuEntity.value.toggle(event);
};
const toggleColumn = (event, moduleIndex, entityIndex, columnIndex) => {
  localStorage.moduleIndex = moduleIndex;
  localStorage.entityIndex = entityIndex;
  localStorage.columnIndex = columnIndex;

  menuColumn.value.toggle(event);
};

const modules = ref([
  {
    // Название модуля
    'name': 'Shop',
    'entity': [
      {
        // Название сущности
        'name': 'Order',
        'group': [
          'admin',
          'manager',
          'user',
        ],
        'validator': {
          Cascade: null,
        },
        'column': [
          {
            'name': 'id',
            'type': 'integer',
            'validator': {
              NotNull: null
            },
            'group': {
              GET: ['user', 'admin', 'manager'],
              POST: ['admin', 'manager'],
              PUT: [],
              DELETE: ['admin'],
            },
          },
          {
            'name': 'name',
            'type': 'string',
            'validator': {
              NotNull: null,
              Length: {"min": 23, "max": 55},
            },
            'group': {
              GET: ['user', 'manager'],
              POST: ['manager'],
              PUT: ['admin'],
            },
          }
        ],
        'updatedAt': getCurrentDateTime()
      },
      {
        // Название сущности
        'name': 'Item',
        'group': [
          'manager',
          'user'
        ],
        'validator': {
          Cascade: null,
        },
        'column': [
          {
            'name': 'id',
            'type': 'integer',
            'validator': {
              NotNull: null
            },
            'group': {
              GET: ['user', 'manager'],
              POST: ['user', 'manager'],
              PUT: ['user', 'manager'],
              DELETE: ['user', 'manager'],
            },
          },
          {
            'name': 'name',
            'type': 'string',
            'validator': {
              NotNull: null
            },
            'group': {
              GET: ['user', 'manager'],
              POST: ['user', 'manager'],
              PUT: ['user', 'manager'],
              DELETE: ['user', 'manager'],
            },
          }
        ],
        'updatedAt': getCurrentDateTime()
      },
      {
        // Название сущности
        'name': 'Card',
        'group': [
          'admin',
          'manager',
          'user',
        ],
        'validator': {
          Cascade: null,
        },
        'column': [
          {
            'name': 'id',
            'type': 'integer',
            'validator': {
              NotNull: null
            },
            'group': {
              GET: ['user', 'admin', 'manager'],
              POST: ['admin', 'manager'],
              PUT: ['admin'],
              DELETE: ['admin'],
            },

          },
          {
            'name': 'name',
            'type': 'string',
            'validator': {
              NotNull: null,
              Length: {"min": 23, "max": 55},
            },
            'group': {
              GET: ['user', 'manager'],
              POST: ['manager'],
              PUT: ['admin'],
              DELETE: ['admin']
            },
          }
        ],
        'updatedAt': getCurrentDateTime()
      },
    ]
  },
  {
    // Название модуля
    'name': 'Dragon',
    'entity': [
      {
        // Название сущности
        'name': 'Boss',
        'group': [
          'manager',
          'user'
        ],
        'validator': {
          Cascade: null,
        },
        'column': [
          {
            'name': 'id',
            'type': 'integer',
            'validator': {
              NotNull: null,
            },
            'group': {
              GET: ['user', 'manager'],
              POST: ['user', 'manager'],
              PUT: ['user', 'manager'],
              DELETE: ['user', 'manager'],
            },
          },
          {
            'name': 'name',
            'type': 'string',
            'validator': {},
            'group': {
              GET: ['user', 'manager'],
              POST: ['user', 'manager'],
              PUT: ['user', 'manager'],
              DELETE: ['user', 'manager'],
            },
          }
        ],
        'updatedAt': getCurrentDateTime()
      },
      {
        // Название сущности
        'name': 'Foo',
        'group': [
          'manager',
          'user'
        ],
        'validator': {
          Cascade: null,
        },
        'column': [
          {
            'name': 'id',
            'type': 'integer',
            'validator': {
              NotNull: null,
            },
            'group': {
              GET: ['user', 'manager'],
              POST: ['user', 'manager'],
              PUT: ['user', 'manager'],
              DELETE: ['user', 'manager'],
            },
          },
          {
            'name': 'name',
            'type': 'string',
            'validator': {},
            'group': {
              GET: ['user', 'manager'],
              POST: ['user', 'manager'],
              PUT: ['user', 'manager'],
              DELETE: ['user', 'manager'],
            },
          }
        ],
        'updatedAt': getCurrentDateTime()
      }
    ]
  }
]);

function getCurrentDateTime() {
  return new Date().toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}


</script>

<style>
.entity-column {
  border-bottom: 1px solid #e5e7eb;
}

.entity-column:last-child {
  border-bottom: none;
}

.entity-group-access, .column-group-access {
  font-size: 0.6em;
  display: block;
  padding: 3px 0;
  color: #5e5e5e;
}

.p-accordion .p-accordion-header .p-accordion-header-link {
  padding: 0;
  background: transparent;
  border: none;
  color: #6b7280;
  transition: box-shadow 0.2s;
  font-size: 0.6em;
  font-weight: 400;
}

.p-accordion .p-accordion-content {
  padding: 5px 0 0 15px;
  border: none;
}

.p-accordion .p-accordion-header .p-accordion-header-link > .p-icon {
  width: 0.6rem;
  height: 0.6rem;
}

.access_for_groups ul {
  width: 100%;
}

.p-panel .p-panel-header .p-panel-header-icon {
  width: inherit;
  height: inherit;
}

.entity_block_editor_butt {
  padding: 8px;
  height: auto;
  width: auto;
}

.p-fieldset-content {
  padding: 1.3rem 0 0 0.8rem;
}

</style>
