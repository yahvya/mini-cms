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
     * défini si le composant a été rendu comme pouvant être mise à jour
     * @protected
     */
    protected isUpdatable:boolean = false;

    /**
     * ajoute un enfant à la liste des enfants
     * @param toAdd le composant à ajouter
     */
    public addChild(...toAdd:Array<Component>):ComponentChildren{
        toAdd.forEach(component => {
            this.children!.push(component);

            if(this.isUpdatable) component.setAsUpdatable();
        });

        return this;
    }

    /**
     * vide les enfants de la class
     */
    public clearChildren():void{
        this.children = [];
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

    public createFrom(componentsMap:Record<string, Record<string, any>>,component:Record<any, any>):Component{

        this.children = component.children.map((child:Record<any, any>) => Component.createComponent(componentsMap,child.componentName,child) );

        return this;
    }

    public  drawing(parent:HTMLElement):HTMLElement{
        this.children!.forEach(child => child.drawing(this.htmlElement!) );

        parent.append(this.htmlElement!);

        return this.htmlElement!;
    }

    public ifComponentChild(): boolean {
        return true;
    }

    /**
     * change tous les enfants du composant comme pouvant être modifié
     */
    public setAsUpdatable():void{
        this.children!.forEach(child => {
            child.setAsUpdatable();
        } );

        this.isUpdatable = true;
    }

    /**
     * @return la liste des enfants du composant
     */
    public getChildren():Array<Component>{
        return this.children;
    }
}
