import * as utilityModule from "tns-core-modules/utils/utils";
import {EventData} from "tns-core-modules/data/observable";
import {Button} from "tns-core-modules/ui/button";

export function onLoaded(event) {
    let container = event.object;


    container.bindingContext = {
        component_url: container.url,
        component_text: container.text
    }
}

export function tapped(event: EventData) {
    let button = <Button> event.object;
    const url = button.get('url');
    utilityModule.openUrl(url);
}