import { curriculumData as part1 } from './curriculumData1.js';
import { curriculumData2 as part2 } from './curriculumData2.js';
import { curriculumDataEmerging as partEmerging } from './curriculumDataEmerging.js';
import { curriculumDataBusiness as partBusiness } from './curriculumDataBusiness.js';
import { curriculumDataInvesting as partInvesting } from './curriculumDataInvesting.js';
import { curriculumDataDeepTech as partDeepTech } from './curriculumDataDeepTech.js';
import { curriculumDataFrontier as partFrontier } from './curriculumDataFrontier.js';
import { curriculumDataSystems as partSystems } from './curriculumDataSystems.js';

export const curriculumData = { ...part1, ...part2, ...partEmerging, ...partBusiness, ...partInvesting, ...partDeepTech, ...partFrontier, ...partSystems };



