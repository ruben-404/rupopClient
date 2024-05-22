import { lazy } from 'react'


export const GenericNotFound = lazy(() =>
  import('src/pages/GenericNotFound/GenericNotFound').then(module => ({
    default: module.GenericNotFound,
  })),
)
