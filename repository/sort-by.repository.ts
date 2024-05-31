import SortBy from "@/interfaces/sort-by";
import storage from "@/libs/storage";

export default class SortByRepository {
  public static sortByKey: string = "sort_by";

  public static getSortByState(): SortBy {
    return storage.getString(this.sortByKey) as SortBy;
  }

  public static setSortByState(state: SortBy): void {
    return storage.set(this.sortByKey, state);
  }
}
