import SortBy from "@/interfaces/sort-by";
import * as SecureStore from "expo-secure-store";

export default class SortByRepository {
  public static sortByKey: string = "sort_by";

  public static getSortByState(): SortBy {
    return SecureStore.getItem(this.sortByKey) as SortBy;
  }

  public static setSortByState(state: SortBy): void {
    return SecureStore.setItem(this.sortByKey, state);
  }
}
