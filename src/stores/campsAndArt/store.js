import _ from 'lodash';
import * as remx from 'remx';

const TABS = {
  CAMPS: 0,
  ART: 1
};

const state = remx.state({
  camps: [],
  art: [],
  search: undefined,
  selectedTab: TABS.CAMPS,
  selectedTagIndex: undefined
});

export const setters = remx.setters({
  setCamps(camps) {
    state.camps = camps;
  },
  setArt(art) {
    state.art = art;
  },
  setSearch(search) {
    state.search = search;
  },
  setSelectedTab(selected) {
    state.selectedTab = selected;
  },
  setSelectedTagIndex(index) {
    if (state.selectedTagIndex === index) {
      state.selectedTagIndex = undefined;
    } else {
      state.selectedTagIndex = index;
    }
  }
});

export const getters = remx.getters({
  getSelectedTab() {
    return state.selectedTab;
  },
  getSearchText() {
    return state.search;
  },
  getArtDataToShow() {
    return getters.getDataToShow(state.art);
  },
  getCampsDataToShow() {
    return getters.getDataToShow(state.camps);
  },
  getDataToShow(dataArray) {
    if (state.search) {
      const ans = _.filter(dataArray, (obj) => {
        if (obj['title']) {
          return obj['title'].toLowerCase().includes(state.search.toLowerCase());
        } return false;
      });
      return ans;
    }
    return dataArray;
  },
  getCampForId(campId) {
    return _.find(state.camps, (camp) => camp.campId === campId);

  },
  getCampTitle(campId) {
    const camp = getters.getCampForId(campId);
    _.get(camp, 'title');
  },
  getSelectedTagIndex() {
    return state.selectedTagIndex
  },
  getAllTags() {

    const tagsArray = _.map(state.camps, (camp) => {
      return _.get(camp, 'tags');
    });

    const tagsWithDuplicates =  _.flattenDeep(tagsArray);
    return _.uniq(tagsWithDuplicates);

  }
});