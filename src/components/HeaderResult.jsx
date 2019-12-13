import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

@inject("FavoritesStore")

@observer
class HeaderResult extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = () => {
        this.isFavorite()
    }

    isFavorite = () => {
        let isFavorite = this.props.FavoritesStore.isFavorites(this.props.cityKey)
        console.log(isFavorite)
        let cityKey = this.props.cityKey
        this.setState({ isFavorite, cityKey })
    }


    addToFavorites = (key, name) => {
        this.props.FavoritesStore.addFavorite({ cityKey: key, cityName: name })
        this.setState({ isFavorite: true })
    }

    removeFromFavorites = async (key) => {
        this.props.FavoritesStore.rmoveFavorites(key)
        this.setState({ isFavorite: false })
    }

    render() {
        let { cityKey, cityName, countryName } = this.props
        if (this.state.cityKey !== cityKey) {
            this.isFavorite()
        }
        return (
            <div className="tableHeaders">
                <div className="locationName"> {cityName} ,{countryName}</div>
                {!this.state.isFavorite ?
                    <button className="favorite" onClick={() => this.addToFavorites(cityKey, cityName)}> <i class="fa fa-bookmark"></i> </button>
                    :
                    <button className="delete" onClick={() => this.removeFromFavorites(cityKey)}><i class="fa fa-trash"></i> </button>
                }
            </div>
        )
    }
}
export default HeaderResult;