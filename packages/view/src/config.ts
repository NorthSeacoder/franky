export default {
    options:[
        {
            "type": "checkbox",//input,checkbox,select
            "field": "routing",
            "label": "routing"
          },
          {
            "type": "select",
            "field": "template",
            "label": "Template",
            "options": [
              { "label": "vanilla", "field": "vanilla" },
              { "label": "vanilla-ts", "field": "vanilla-ts" },
              { "label": "svelte-ts", "field": "svelte-ts" }
            ]
          }

    ]
}