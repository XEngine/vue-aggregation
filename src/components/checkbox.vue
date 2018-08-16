<template>
    <li class="navList-item">
        <input @change="$emit('input', $event.target.checked)" :checked="checked" class="form-checkbox"
               :id="id"
               type="checkbox">
        <label class="form-label optimizedCheckout-form-label" :for="id">
            {{label}} ({{count}})
        </label>
    </li>
</template>

<script>
    export default {
        props: [
            'label',
            'count',
            'checked'
        ],
        data() {
            return {
                id: this.guid()
            }
        },
        methods: {
            guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            }
        }
    }
</script>