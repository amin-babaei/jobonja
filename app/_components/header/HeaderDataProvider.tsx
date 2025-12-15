import { getCities } from "app/services/city";
import HeaderSteps from "./HeaderSteps";
import { getCategoryData } from "app/services/category";
import ErrorMessage from "@components/ui/ErrorMessage";

export default async function HeaderDataProvider() {
  const [cityResult, categoryResult] = await Promise.all([
    getCities(),
    getCategoryData(),
  ]);

  if (cityResult.error || categoryResult.error) {
    return (
      <ErrorMessage message={cityResult.error || categoryResult.error} />
    );
  }

  return (
    <HeaderSteps cities={cityResult.data} categories={categoryResult.data} />
  );
}
