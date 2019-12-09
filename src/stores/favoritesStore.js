import { observable, computed, action } from 'mobx';

export class favoritesStore {
    @observable favorites = []

    @computed get getAllFavorites() {
        let LSfavorites = localStorage.getItem('favorites')
        if (LSfavorites) {
            let favorites = JSON.parse(localStorage.getItem('favorites'))
            this.favorites = favorites
            console.log(favorites)
            return favorites
        }
    }
    // @action allFavorites() {
    
    // }

    @action addFavorite = async (obj) => {
        this.favorites.push(obj)
        console.log(this.favorites, obj)
        console.log(obj)
        let LSfavorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
        await LSfavorites.push(obj)
        console.log(LSfavorites)
        localStorage.setItem('favorites', JSON.stringify(LSfavorites))
    }

    @action rmoveFavorites = (favoritesKey) => {
        let favorite = this.favorites.filter(i => i.key !== favoritesKey)
        this.favorites = favorite

        let LSfavorites = JSON.parse(localStorage.getItem('favorites'))
        for (let i = 0; i < LSfavorites.length; i++) {
            let fav = LSfavorites[i]
            if (fav.cityKey === favoritesKey) {
                LSfavorites.splice(i, 1)
            }
        }
        LSfavorites = JSON.stringify(LSfavorites)
        localStorage.setItem('favorites', LSfavorites)
    }

    @action isFavorites = (favoritesKey) => {
        let isFavorites
        let favorites
        if (localStorage.getItem('favorites')) {
            let LSfavorites = JSON.parse(localStorage.getItem('favorites'))
            for (let i = 0; i < LSfavorites.length; i++) {
                let fav = LSfavorites[i]
                if (fav.cityKey === favoritesKey) {
                    isFavorites = true
                    favorites = LSfavorites
                } else { isFavorites = false }
            }
        } else { isFavorites = false }
        if (isFavorites) {
            this.favorites = favorites
        } else {
            isFavorites = this.favorites.filter(i => i.key === favoritesKey)
            isFavorites.length !== 0 ? isFavorites = true : isFavorites = false
        }
        return isFavorites
    }
}



