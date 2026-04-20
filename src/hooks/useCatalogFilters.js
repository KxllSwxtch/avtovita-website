import { useReducer, useCallback } from 'react'

export const initialFilterState = {
  selectedManufacturer: '',
  selectedModelGroup: '',
  selectedModel: '',
  selectedConfiguration: '',
  selectedBadge: '',
  selectedBadgeDetails: '',
  priceStart: '',
  priceEnd: '',
  mileageStart: '',
  mileageEnd: '',
  startYear: '',
  startMonth: '00',
  endYear: '',
  endMonth: '00',
  searchByNumber: '',
  sortOption: 'newest',
  currentPage: 1,
}

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'INIT_FROM_URL':
      return {
        ...state,
        selectedManufacturer: action.value.manufacturer || '',
        selectedModelGroup: action.value.modelGroup || '',
        selectedModel: action.value.model || '',
        selectedConfiguration: '',
        selectedBadge: '',
        selectedBadgeDetails: '',
      }
    case 'SET_MANUFACTURER':
      return {
        ...state,
        selectedManufacturer: action.value,
        selectedModelGroup: '',
        selectedModel: '',
        selectedConfiguration: '',
        selectedBadge: '',
        selectedBadgeDetails: '',
        currentPage: 1,
      }
    case 'SET_MODEL_GROUP':
      return {
        ...state,
        selectedModelGroup: action.value,
        selectedModel: '',
        selectedConfiguration: '',
        selectedBadge: '',
        selectedBadgeDetails: '',
        currentPage: 1,
      }
    case 'SET_MODEL':
      return {
        ...state,
        selectedModel: action.value,
        selectedConfiguration: '',
        selectedBadge: '',
        selectedBadgeDetails: '',
        currentPage: 1,
      }
    case 'SET_CONFIGURATION':
      return {
        ...state,
        selectedConfiguration: action.value,
        selectedBadge: '',
        selectedBadgeDetails: '',
        currentPage: 1,
      }
    case 'SET_BADGE':
      return {
        ...state,
        selectedBadge: action.value,
        selectedBadgeDetails: '',
        currentPage: 1,
      }
    case 'SET_BADGE_DETAILS':
      return {
        ...state,
        selectedBadgeDetails: action.value,
        currentPage: 1,
      }
    case 'RESET_ALL':
      return { ...initialFilterState }
    default:
      return state
  }
}

export const useCatalogFilters = (savedPage) => {
  const [state, dispatch] = useReducer(filterReducer, {
    ...initialFilterState,
    currentPage: savedPage || 1,
  })

  const setField = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }, [])

  const initFromUrl = useCallback((value) => {
    dispatch({ type: 'INIT_FROM_URL', value })
  }, [])

  const setManufacturer = useCallback((value) => {
    dispatch({ type: 'SET_MANUFACTURER', value })
  }, [])

  const setModelGroup = useCallback((value) => {
    dispatch({ type: 'SET_MODEL_GROUP', value })
  }, [])

  const setModel = useCallback((value) => {
    dispatch({ type: 'SET_MODEL', value })
  }, [])

  const setConfiguration = useCallback((value) => {
    dispatch({ type: 'SET_CONFIGURATION', value })
  }, [])

  const setBadge = useCallback((value) => {
    dispatch({ type: 'SET_BADGE', value })
  }, [])

  const setBadgeDetails = useCallback((value) => {
    dispatch({ type: 'SET_BADGE_DETAILS', value })
  }, [])

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET_ALL' })
  }, [])

  return {
    filters: state,
    setField,
    initFromUrl,
    setManufacturer,
    setModelGroup,
    setModel,
    setConfiguration,
    setBadge,
    setBadgeDetails,
    resetAll,
  }
}
