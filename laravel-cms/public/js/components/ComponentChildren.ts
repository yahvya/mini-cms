import {Component} from "./Component.js";

/**
 * classe avec des sous composants
 */
export abstract class ComponentChildren extends Component{
    /**
     * Contient une liste des composants
     * @protected
     */
    protected children: Array<Component> = [];

    /**
     * ajoute un enfant à la liste des enfants
     * @param toAdd le composant à ajouter
     */
    public addChild(...toAdd:Array<Component>):ComponentChildren{
        this.children!.push(...toAdd);

        return this;
    }

    public removeChild(toRemove:Component):ComponentChildren{
        const index = this.children!.indexOf(toRemove);

        if(index != -1){
            delete this.children![index];
            this.children = this.children!.filter(el => el != undefined);
        }

        return this;
    }

    public exportComponent() : Record<any, any> {
        return {
            componentName: this.name!,
            children: this.children!.map(child => child.exportComponent() )
        };
    }

    public createFrom(componentsMap:Record<string,Function>,component:Record<any, any>):Component{
        this.children = component.children.map((child:Record<any, any>) => Component.createComponent(componentsMap,child.componentName,child) );

        return this;
    }


    public  drawing(parent:HTMLElement):HTMLElement{
        this.children!.forEach(child => child.drawing(this.htmlElement!) );

        parent.append(this.htmlElement!);

        return this.htmlElement!;
    }
}
