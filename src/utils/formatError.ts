import { GraphQLError } from "graphql";
import { ArgumentValidationError } from "type-graphql";

/**
 * Custom error formatter for Apollo Server.
 * It handles TypeGraphQL validation errors and preserves standard GraphQL error fields.
 */
export const formatError = (err: GraphQLError) => {
  const { message, locations, path, extensions } = err;
  const originalError = err.originalError;

  // Handle TypeGraphQL validation errors
  if (originalError instanceof ArgumentValidationError) {
    // In TypeGraphQL v2, validationErrors are inside extensions
    const validationErrors =
      (originalError as any).extensions?.validationErrors ||
      (originalError as any).validationErrors;

    return {
      message: "Input validation failed",
      locations,
      path,
      extensions: {
        ...extensions,
        code: "BAD_USER_INPUT",
        validationErrors: validationErrors?.map((e: any) => ({
          property: e.property,
          constraints: e.constraints,
        })) || [],
      },
    };
  }

  // Fallback for other errors, preserving standard fields
  return {
    message,
    locations,
    path,
    extensions,
  };
};
