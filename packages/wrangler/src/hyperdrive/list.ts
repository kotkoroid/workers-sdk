import { readConfig } from "../config";
import { logger } from "../logger";
import { listConfigs } from "./client";
import { capitalizeScheme, formatCachingOptions } from "./shared";
import type {
	CommonYargsArgv,
	StrictYargsOptionsToInterface,
} from "../yargs-types";

export function options(yargs: CommonYargsArgv) {
	return yargs;
}

export async function handler(
	args: StrictYargsOptionsToInterface<typeof options>
) {
	const config = readConfig(args);

	logger.log(`📋 Listing Hyperdrive configs`);
	const databases = await listConfigs(config);
	logger.table(
		databases.map((database) => ({
			id: database.id,
			name: database.name,
			user: database.origin.user ?? "",
			host: database.origin.host ?? "",
			port: database.origin.port?.toString() ?? "",
			scheme: capitalizeScheme(database.origin.scheme),
			database: database.origin.database ?? "",
			caching: formatCachingOptions(database.caching),
			mtls: JSON.stringify(database.mtls),
		}))
	);
}
