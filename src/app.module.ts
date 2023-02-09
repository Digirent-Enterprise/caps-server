import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";

// TODO: may change to use Apollo v4 since apollo-server-express now deprecated

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      transformSchema: (schema) => upperDirectiveTransformer(schema, "upper"),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: "upper",
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
