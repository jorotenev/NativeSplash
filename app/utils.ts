import {Observable} from "tns-core-modules/data/observable";

/**
 * Decorate a property of a class which extends Observable, so that
 * changing the value of the property will automatically fire the propertyChangeEvent
 *
 * source: https://www.nativescript.org/blog/nativescript-observable-magic-string-property-name-be-gone
 */
export function ObservableProperty() {

    return (target: Observable, propertyKey: string) => {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this["_" + propertyKey];
            },
            set: function (value) {
                if (this["_" + propertyKey] === value) {
                    return;
                }

                this["_" + propertyKey] = value;
                this.notify({
                    eventName: Observable.propertyChangeEvent,
                    propertyName: propertyKey,
                    object: this,
                    value,
                });
            },
            enumerable: true,
            configurable: true
        });
    };
}