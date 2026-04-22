import { autocompleteCode } from "@/components/AutocompleteComponents/AutocompleteCode";
import Autocomplete from "@/components/AutocompleteComponents/Autocomplete";
import PageHeader from "@/components/PageHeader";
import HighLightText from "@/components/HighLightText";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import CodeViewModal from "@/components/CodeViewModal";
import { openCommonModal } from "@/store/actions";

const notes = [
  {
    title: "What is Autocomplete?",
    content: (
      <p className="text-sm leading-relaxed text-gray-600">
        Autocomplete is a UI pattern where an input field dynamically suggests
        matching options as the user types. It reduces effort by letting users
        pick from filtered results instead of typing a full value. Common
        examples: search bars, address inputs, tag selectors.
      </p>
    ),
  },
  {
    title: "Debouncing",
    content: (
      <p className="text-sm leading-relaxed text-gray-600">
        Instead of filtering on every keystroke, we wait{" "}
        <HighLightText>500ms</HighLightText> after the user stops typing before
        running the filter. This is done with{" "}
        <HighLightText>setTimeout</HighLightText> inside a{" "}
        <HighLightText>useEffect</HighLightText>. The cleanup function calls{" "}
        <HighLightText>clearTimeout</HighLightText> — so if the user types again
        before the timer fires, the previous timeout is cancelled and the clock
        resets. Without debouncing, every character triggers a filter (or API
        call), wasting resources.
      </p>
    ),
  },
  {
    title: "Click-Outside to Close",
    content: (
      <p className="text-sm leading-relaxed text-gray-600">
        A <HighLightText>useRef</HighLightText> is attached to the container
        div. A <HighLightText>mousedown</HighLightText> listener on{" "}
        <HighLightText>document</HighLightText> checks if the click target is
        inside or outside using{" "}
        <HighLightText>containerRef.current.contains(e.target)</HighLightText>.
        If outside, the dropdown closes. The listener is added in a{" "}
        <HighLightText>useEffect</HighLightText> and cleaned up on unmount to
        avoid memory leaks.
      </p>
    ),
  },
  {
    title: "Data Fetching on Mount",
    content: (
      <p className="text-sm leading-relaxed text-gray-600">
        Posts are fetched from{" "}
        <HighLightText>jsonplaceholder.typicode.com</HighLightText> once on
        mount via a <HighLightText>useEffect</HighLightText> with an empty
        dependency array <HighLightText>[]</HighLightText>. All filtering
        happens client-side against this cached dataset — no network request on
        every keystroke. In a real app you would replace this with a debounced
        API call.
      </p>
    ),
  },
  {
    title: "Dropdown Visibility Logic",
    content: (
      <p className="text-sm leading-relaxed text-gray-600">
        The dropdown is controlled by two conditions:{" "}
        <HighLightText>open === true</HighLightText> AND{" "}
        <HighLightText>options.length &gt; 0</HighLightText>. The{" "}
        <HighLightText>open</HighLightText> flag is set to{" "}
        <HighLightText>false</HighLightText> when the query is cleared or the
        user clicks outside, and to <HighLightText>true</HighLightText> when
        results are found. The <HighLightText>onFocus</HighLightText> handler
        reopens the dropdown if the user clicks back into the input while
        results already exist.
      </p>
    ),
  },
  {
    title: "Key Concepts Used",
    content: (
      <div className="flex flex-wrap gap-2">
        {[
          "useState",
          "useEffect",
          "useRef",
          "Debouncing",
          "setTimeout / clearTimeout",
          "Event delegation",
          "contains()",
          "Controlled input",
          "Conditional rendering",
        ].map((tag) => (
          <HighLightText key={tag}>{tag}</HighLightText>
        ))}
      </div>
    ),
  },
];

const AutocompletePage = () => {
  const dispatch = useDispatch<AppDispatch>();
    const { commonModal } = useSelector((state: RootState) => state.commonState);

  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      {/* Header */}
      <div className="w-full px-4 py-2 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader
          title="Autocomplete"
          description="Filters and suggests matching options in real-time as the user types, with 500ms debounce and click-outside to close."
        />
      </div>

      {/* Demo + Code */}
      <div className="shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full">
        <div className="h-[calc(100vh-11rem)] overflow-auto space-y-4">
          <div className="w-full p-4 pb-0 space-y-4">
            <div className="relative">
              <h3 className="text-lg font-semibold text-gray-700">Live Demo</h3>
              <Button
                variant="ghost"
                className="absolute top-0 right-0 h-8 rounded-sm"
                onClick={() => dispatch(openCommonModal())}
              >
                <Code className="text-primary" />
              </Button>
            </div>
            <Autocomplete />
          </div>

          <div className="w-full p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              How It Works
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {notes.map(({ title, content }) => (
                <div
                  key={title}
                  className="rounded-sm bg-gray-100 p-4 shadow-[0px_5px_8px_rgba(0,0,0,0.08)] space-y-2"
                >
                  <h4 className="text-sm font-semibold text-primary">
                    {title}
                  </h4>
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {commonModal && (
        <CodeViewModal title="Heap Sort Code" viewCode={autocompleteCode} />
      )}
    </div>
  );
};

export default AutocompletePage;
