export const normolizeDishes = (entities, idFieldName = "ID") => ({
    entities: entities.reduce((acc, entity) => {
        if(acc[entity[idFieldName]]) {
            acc[entity[idFieldName]].push(entity)
        }
        else {
            acc[entity[idFieldName]] = [entity];
        }
      return acc;
    }, {}),
    ids: entities.map((entity) => entity[idFieldName]),
  });