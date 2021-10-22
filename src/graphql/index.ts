import {createApplication} from 'graphql-modules';

import {queryModules} from './queries';
import {mutationsModules} from './mutations';

export const graphql = createApplication({
    modules: [...queryModules,...mutationsModules]
});
