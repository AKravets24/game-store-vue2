import { getGameList } from '@/dal/RestClient'
import {GameCard_Type, GenreSubStr_Type} from "@/dal/gameCards";
import {sorter} from "@/utils/helpers";

export type CartItem_Type = {
  fullName: GameCard_Type['fullName'],
  price: GameCard_Type['price'],
  platforms: GameCard_Type['platforms'],
  id: GameCard_Type['id'],
  amount: number,
  discount: number,
}

export const storeModule = {
  state: () => {
    return {
      games:             [] as GameCard_Type[],
      isLoading:         false as boolean,
      isError:           false as boolean,

      debouncedValue:    '' as string,
      _timeoutID:        null as any,

      genres:            [] as GameCard_Type['genres'][],
      selectedGenres:    [] as GameCard_Type['genres'][],

      mode:              [] as GameCard_Type['mode'][],
      selectedMode:      [] as GameCard_Type['mode'][],

      platforms:         [],
      selectedPlatforms: [],


      sortCriteria: [
        { name: 'By year',   value: 'year'      },
        { name: 'By price',  value: 'price'     },
        { name: 'By rating', value: 'rating'    },
        { name: 'By name',   value: 'shortName' },
      ] as {name: string, value: string}[],
      selectedCriteria:   '' ,

      sortOptions: [
        { name: 'By ascending',  value: 'ascend'  },
        { name: 'By descending', value: 'descend' },
      ] as {name: string, value: string}[],
      selectedOption:   '' ,

      orders: [] as CartItem_Type[],}
  },

  getters: { // computed

    filterByGenres (state: any, getters: any) {
      if(state.selectedGenres.length) {
        function genres(genre: GenreSubStr_Type) {
          const matches = state.selectedGenres.filter((el: GenreSubStr_Type) => el === genre)
          return !!matches.length;
        }
        return [...state.games].filter((game: GameCard_Type) => game.genres.some(genres))
      }
      return [...state.games]
    },

    filterByPlatforms (state: any, getters: any) {
      if(state.selectedPlatforms.length)  {
        function platforms(platform: string) {
          const matches = state.selectedPlatforms.filter((el: string) => el === platform)
          return !!matches.length;
        }
        return getters.filterByGenres.filter((game: GameCard_Type) => game.platforms.some(platforms))
      }
      return getters.filterByGenres;
    },

    filterByMode (state: any, getters: any) {
      if(state.selectedMode.length)  {
        function modes(mode: string) {
          const matches = state.selectedMode.filter((el: string) => el === mode)
          return !!matches.length;
        }
        return getters.filterByPlatforms.filter((game: GameCard_Type) => game.mode.some(modes))
      }
      return getters.filterByPlatforms;
    },

    sortByCriteria (state: any, getters: any) {
      switch (state.selectedCriteria) {
        case "year":      return getters.filterByMode.sort((a: any, b: any) => sorter(a.year,      b.year)      );
        case "price":     return getters.filterByMode.sort((a: any, b: any) => sorter(a.price,     b.price)     );
        case "rating":    return getters.filterByMode.sort((a: any, b: any) => sorter(a.rating,    b.rating)    );
        case "shortName": return getters.filterByMode.sort((a: any, b: any) => sorter(a.shortName, b.shortName) );
        default:          return getters.filterByMode;
      }
    },

    sortByOptions (state: any, getters: any) {
      if(state.selectedCriteria) {
        switch (state.selectedOption) {
          case "ascend":   return getters.sortByCriteria.sort((a: any, b: any) => sorter( a[state.selectedCriteria], b[state.selectedCriteria] ));
          case "descend":  return getters.sortByCriteria.sort((a: any, b: any) => sorter( b[state.selectedCriteria], a[state.selectedCriteria] ));
          default:         return getters.sortByCriteria
        }
      }
      else {
        switch (state.selectedOption) {
          case "ascend":   return getters.filterByMode.sort((a: any, b: any) => sorter( a.shortName, b.shortName ));
          case "descend":  return getters.filterByMode.sort((a: any, b: any) => sorter( b.shortName, a.shortName ));
          default:         return getters.filterByMode;
        }
      }
    },

    searchedPosts ( state: any, getters: any ) {
      if(state.debouncedValue.length >= 3) {
        return getters.sortByOptions.filter((game: GameCard_Type) =>
            game.shortName.toLowerCase().includes(state.debouncedValue.toLowerCase()) );
      }
      return getters.sortByOptions;
    },

  },
  mutations: {

    setLoading(state: any, loading: boolean) {
      state.isLoading = loading
    },
    setGames(state: any, payload: GameCard_Type[]) {
      state.games = payload
    },
    setGenres (state: any, payload: GameCard_Type[]) {
      const newGenres: GameCard_Type['genres'][] = [];
      payload.forEach((el: GameCard_Type ) => (el.genres as any)
          .forEach((el2: GameCard_Type['genres']) => newGenres.push(el2)) );
      return state.genres = [...new Set(newGenres)]
          .sort((a: any, b: any) => sorter(a,b))
    },

    setModes (state: any, payload: GameCard_Type[]) {
      const newModes: GameCard_Type['genres'][] = [];
      payload.forEach((el: GameCard_Type ) => (el.mode as any)
          .forEach((el2: GameCard_Type['genres']) => newModes.push(el2)) );
      return state.mode = [...new Set(newModes)]
    },

    setPlatforms(state: any, payload: GameCard_Type[]) {
      const newPlatforms: any = [];
      payload.forEach((el: GameCard_Type ) => (el.platforms as any)
          .forEach((el2: string) => newPlatforms.push(el2)) );
      return state.platforms = [...new Set(newPlatforms)]
          .sort((a: any, b: any) => sorter(a , b))
    },

    setSearchedGenres (state: any, selectedGenres: GenreSubStr_Type[]) { state.selectedGenres = selectedGenres; },
    setSearchedPlatforms (state: any, selectedPlatforms: string[]) { state.selectedPlatforms = selectedPlatforms; },
    setSearchedModes (state: any, selectedMode: string[]) { state.selectedMode = selectedMode; },

    setSelectedCriteria (state: any, value: string) {
      state.selectedCriteria = value
    },

    setSelectedOption (state: any, value: string) {
      state.selectedOption = value
    },

    async setDebounce (state: any, { value, delay= 500 }: {value: string, delay: number} ) {
      clearTimeout(state._timeoutID);
      state._timeoutID = await setTimeout(() => {
        return state.debouncedValue = value
      }, delay);
    },

    addNewCartItem (state: any, payload: GameCard_Type) {
      const { fullName, price, platforms, id } = payload;
      const theSameItemIdx = state.orders.findIndex((el: any) => el.id === id);

      if (theSameItemIdx !== -1 ) {
        state.orders[theSameItemIdx].amount ++;
      } else {
        state.orders.push({ fullName, price, platforms, id, amount: 1, discount: 0 })
      }
    },

    cartItemsAmountInc(state: any, idx: number) {
      state.orders[idx].amount ++;
    },

    cartItemsAmountDec(state: any, idx: number) {
      if (state.orders[idx].amount === 1) {
        return
      }
      state.orders[idx].amount --;
    },

    deleteItemFromCart (state: any, idx: number) {
      state.orders.splice(idx, 1);
    },

  },
  actions: {
    async getGames({_, commit}: any) {
      commit('setLoading', true);
      const res = await getGameList();
      commit('setGames',     res);
      commit('setGenres',    res);
      commit('setModes',     res);
      commit('setPlatforms', res);
      commit('setLoading', false);
    },

  },
  modules: {},
  namespaced: true,
};
