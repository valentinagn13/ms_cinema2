import Route from "@ioc:Adonis/Core/Route";
import Security from "App/Middleware/Security";

Route.get("/most-active-user", async ({ response }) => {
  const mostActiveUser = Security.getMostActiveUser();
  if (mostActiveUser) {
    return response.json({ userId: mostActiveUser });
  } else {
    return response.json({ message: "No hay accesos registrados." });
  }
});
