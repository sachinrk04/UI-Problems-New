import PageHeader from '@/components/PageHeader'
import { useWindowSize } from '@/components/ReactHooksComponents/useWindowSize';

function Browser({width, height}: {width: any, height: any}) {
  return (
    <div
      className="border-2 bg-slate-400 border-slate-900"
      style={{ width: width / 2, height: height / 2 }}
    />
  );
}

const UseWindowSizePage = () => {
    const { width, height } = useWindowSize();
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title="useCounter" />
      </div>
      <div className="h-[calc(100vh-9.75rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold text-primary">
              Resize the window
            </h2>
            <p className="font-semibold">
              Width:{" "}
              <span className="text-sm font-normal text-primary">
                {width}
              </span>
            </p>
            <p className="font-semibold">
              Height:{" "}
              <span className="text-sm font-normal text-primary ">
                {height}
              </span>
            </p>
          </div>
          <Browser width={width} height={height} />
        </div>
      </div>
    </div>
  )
}

export default UseWindowSizePage
