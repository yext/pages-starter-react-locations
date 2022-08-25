import { FeaturesConfig } from "../../../common/src/feature/features";
import { ProjectStructure } from "../../../common/src/project/structure";
/**
 * generateTestData will run yext sites generate-test-data and return true in
 * the event of a successful run and false in the event of a failure.
 */
export declare const generateTestData: () => Promise<boolean>;
export declare const generateTestDataForPage: (stdout: NodeJS.WriteStream, featuresConfig: FeaturesConfig, entityId: string, locale: string, projectStructure: ProjectStructure) => Promise<any>;
