import { observable, computed, action } from 'mobx'
// import route from '../config/route'
// if you need to use axios in this pruject npm install axsiox and uncomment lines 2,4,21-25,27-34
// import axios from 'axios'


export class myStore {
    @observable Items = []
    @observable Catgories = []
    // @observable numPeople
    @computed get AllCatgories() { //automatically calculates the total reservations

        return this.Catgories
    }

    @action getCatgories = (Catgories) => {
        Catgories.map(i => this.Catgories.push(i))
        console.log(this.Catgories, Catgories)
    }

    // @action allItems = async () => {
    //     let Items = await axios.get(`${route}getItems`)
    //     this.Items = Items
    //     // return Items
    // }

    // @action addItem = async (Item) => {
    //     let saveStatus = await axios.post(`${route}addNewItem`, Item)
    //     if (saveStatus.data === 'succes!') {
    //         return alert('added item successfully')
    //     } else {
    //         return alert('there was a problem with add the item, please try again')
    //     }
    // }
}



