<template>
  <ul class="list-none bg-gray-50 border-1 border-gray-300 p-3 border-round">
    <TieredMenu ref="menu" id="overlay_menu" :model="items" :popup="true"/>
    <div class="flex ">
      <b class="flex-grow-1 flex align-items-center ">Validator:</b>
      <div class="flex-none flex align-items-end"><Button severity="secondary" style="border: none" outlined rounded type="button" icon="pi pi-plus" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"/>
      </div>
    </div>
    <li v-for="(validator, validatorName) in model">
      <div class="bg-white m-1 px- border-1 border-round border-gray-200">
        <div class="flex ">
          <div class="flex-grow-1 flex align-items-center px-3 py-2 border-round" style="word-break: break-all; word-wrap: break-word;">
            {{validatorName}}
          </div>
          <div class="flex-none flex align-items-center justify-content-center font-bold m-1 px-1 py-1 border-round">
            <Button type="button"  icon="pi pi-times" style="border: none;" @click="onDeleteValidator(validatorName)" rounded outlined class="h-2rem w-2rem text-color-secondary"></Button>
          </div>
        </div>
        <component ref="refComponents" :is="components[validatorName]" v-model="model[validatorName]"></component>
      </div>
    </li>
  </ul>
</template>

<script setup>
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';
import {useConfirm} from "primevue/useconfirm";
import {ref, defineModel, shallowRef, defineExpose} from 'vue';

import CardScheme from "@/components/Input/Validator/CardScheme.vue";
import Choice from "@/components/Input/Validator/Choice.vue";
import DivisibleBy from "@/components/Input/Validator/DivisibleBy.vue";
import EqualTo from "@/components/Input/Validator/EqualTo.vue";
import File from "@/components/Input/Validator/File.vue";
import GreaterThan from "@/components/Input/Validator/GreaterThan.vue";
import GreaterThanOrEqual from "@/components/Input/Validator/GreaterThanOrEqual.vue";
import IdenticalTo from "@/components/Input/Validator/IdenticalTo.vue";
import Image from "@/components/Input/Validator/Image.vue";
import Length from "@/components/Input/Validator/Length.vue";
import LessThan from "@/components/Input/Validator/LessThan.vue";
import LessThanOrEqual from "@/components/Input/Validator/LessThanOrEqual.vue";
import NotEqualTo from "@/components/Input/Validator/NotEqualTo.vue";
import NotIdenticalTo from "@/components/Input/Validator/NotIdenticalTo.vue";
import PasswordStrength from "@/components/Input/Validator/PasswordStrength.vue";
import Range from "@/components/Input/Validator/Range.vue";
import Regex from "@/components/Input/Validator/Regex.vue";
import Type from "@/components/Input/Validator/Type.vue";

const model = defineModel();
const menu = ref();
const confirm = useConfirm();
const components = shallowRef({
  'CardScheme': CardScheme,
  'Choice': Choice,
  'DivisibleBy': DivisibleBy,
  'EqualTo': EqualTo,
  'File': File,
  'GreaterThan': GreaterThan,
  'GreaterThanOrEqual': GreaterThanOrEqual,
  'IdenticalTo': IdenticalTo,
  'Image': Image,
  'Length': Length,
  'LessThan': LessThan,
  'LessThanOrEqual': LessThanOrEqual,
  'NotEqualTo': NotEqualTo,
  'NotIdenticalTo': NotIdenticalTo,
  'PasswordStrength': PasswordStrength,
  'Range': Range,
  'Regex': Regex,
  'Type': Type,
})

function onDeleteValidator(validator) {
  confirm.require({
    message: `Are you sure you want to delete validator: ${validator}?`,
    header: 'Confirmation delete validator',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      delete model.value[validator]
    },
  });
}

function addValidator(event) {
  model.value[event.item.label] = ref();
}

const items = ref([
  {
    label: 'Basic',
    icon: 'pi pi-info-circle',
    items: [
      {
        label: 'NotBlank',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Blank',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'NotNull',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'IsNull',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'IsTrue',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'IsFalse',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Type',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      }
    ]
  },
  {
    label: 'String',
    icon: 'pi pi-hashtag',
    items: [
      {
        label: 'Email',
        icon: 'pi pi-at',
        command: (e) => addValidator(e),
      },
      {
        label: 'Length',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Url',
        icon: 'pi pi-link',
        command: (e) => addValidator(e),
      },
      {
        label: 'Regex',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Hostname',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Ip',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Cidr',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Json',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Uuid',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Ulid',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'UserPassword',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'NotCompromisedPassword',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'PasswordStrength',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'CssColor',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'NoSuspiciousCharacters',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      }
    ]
  },
  {
    label: 'Comparison',
    icon: 'pi pi-file-excel',
    items: [
      {
        label: 'EqualTo',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'NotEqualTo',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'IdenticalTo',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'NotIdenticalTo',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'LessThan',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'LessThanOrEqual',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'GreaterThan',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'GreaterThanOrEqual',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Range',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'DivisibleBy',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Unique',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      }
    ]
  },
  {
    label: 'Number',
    icon: 'pi pi-sort-numeric-down-alt',
    items: [
      {
        label: 'Positive',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'PositiveOrZero',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Negative',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'NegativeOrZero',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      }
    ]
  },
  {
    label: 'Date',
    icon: 'pi pi-calendar-times',
    items: [
      {
        label: 'Date',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'DateTime',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Time',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Timezone',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      }
    ]
  },
  {
    label: 'Choice',
    icon: 'pi pi-sitemap',
    items: [
      {
        label: 'Choice',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Language',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Locale',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Country',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      }
    ]
  },
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      {
        label: 'File',
        icon: 'pi pi-file',
        command: (e) => addValidator(e),
      },
      {
        label: 'Image',
        icon: 'pi pi-image',
        command: (e) => addValidator(e),
      }
    ]
  },
  {
    label: 'Financial',
    icon: 'pi pi-money-bill',
    items: [
      {
        label: 'Bic',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'CardScheme',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Currency',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Luhn',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Iban',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Isbn',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Issn',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      },
      {
        label: 'Isin',
        icon: 'pi pi-arrow-circle-right',
        command: (e) => addValidator(e),
      }
    ]
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
const refComponents = ref()
function validate() {
  if (typeof refComponents.value !== 'object') {
    return true
  }
  let result = [];
  for (const ref of refComponents.value) {
    if (typeof ref.validate === 'function') {
      result.push(ref.validate())
    }
  }
  return result.every((value) => value === true)
}
function validateClear() {
  if (typeof refComponents.value !== 'object') {
    return true
  }
  for (const ref of refComponents.value) {
    if (typeof ref.validateClear === 'function') {
      ref.validateClear()
    }
  }
}
defineExpose({
  validate,
  validateClear,
});
</script>

<style scoped>
ul.list-none {
  padding: 0;
  margin: 0;
  width: 100%;
}

ul.list-none > li:first-child {
  margin-top: 0;
}

ul.list-none > li {
  margin-top: 0.8rem;
}

</style>