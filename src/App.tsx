import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
// import { createMockData } from './mock/appMock';
import { StyledSchedulerFrame } from './styles';
import { Scheduler, SchedulerProjectData } from '.';
import { ParsedDatesRange } from './utils/getDatesRange';
import { dataRetrive } from './Helpers/Data-helper';
import { transformData } from './Helpers/FormatDataverseData';
import { redirectToRecord } from './Helpers/RedirectRecord';
import { SchedulerRow } from './types/global';
import { CiFilter } from "react-icons/ci";
// const SampleData = [
//   {
//       "id": "e20df4ab-5a62-41c8-97fa-c1924c543937",
//       "label": {
//           "title": "Prexa User 2",
//           "icon": "",
//           "subtitle": ""
//       },
//       "data": [
//           {
//               "id": "99bff130-2912-ef11-9f89-002248d59327",
//               "startDate": "2024-05-14T19:35:45.000Z",
//               "endDate": "2024-05-15T12:00:00.000Z",
//               "occupancy": 4000,
//               "title": "Change",
//               "bgColor": "rgb(40, 167, 69)",
//               "jobstatus": "Completed",
//               "labourcosthr": 5,
//               "labourhours": 1,
//               "startFormatDate": "5/15/2024 1:05 AM",
//               "endFormatedEstimatedDate": "5/15/2024 5:30 PM"
//           },
//           {
//               "id": "6286dce9-f632-ee11-bdf4-000d3a0a2267",
//               "startDate": "2023-08-04T18:43:42.000Z",
//               "endDate": "2023-08-04T20:00:00.000Z",
//               "occupancy": 4000,
//               "title": "ENGINE SERVICE",
//               "bgColor": "rgb(21, 180, 191)",
//               "jobstatus": "New",
//               "startFormatDate": "8/5/2023 12:13 AM",
//               "endFormatedEstimatedDate": "8/5/2023 1:30 AM"
//           }
//       ]
//   },
//   {
//       "id": "04f37a23-6e49-489f-8cd0-f63eabc6058a",
//       "label": {
//           "title": "Prexa Trial",
//           "icon": "",
//           "subtitle": ""
//       },
//       "data": [
//           {
//               "id": "848a4a9b-666f-ef11-a670-6045bdf9cd4f",
//               "startDate": "2024-09-11T19:30:33.000Z",
//               "endDate": "2024-09-16T02:30:00.000Z",
//               "occupancy": 4000,
//               "title": "Good",
//               "bgColor": "rgb(21, 132, 191)",
//               "jobstatus": "Work In Progress",
//               "estimatedcost": 50,
//               "labourhours": 5,
//               "startFormatDate": "9/12/2024 1:00 AM",
//               "endFormatedEstimatedDate": "9/16/2024 8:00 AM"
//           },
//           {
//               "id": "d6b70ca7-676f-ef11-a670-6045bdf9cd4f",
//               "startDate": "2024-08-26T11:27:07.000Z",
//               "endDate": "2024-08-28T02:30:00.000Z",
//               "occupancy": 4000,
//               "title": "New",
//               "bgColor": "rgb(21, 180, 191)",
//               "jobstatus": "New",
//               "startFormatDate": "8/26/2024 4:57 PM",
//               "endFormatedEstimatedDate": "8/28/2024 8:00 AM"
//           },
//           {
//               "id": "067efad2-4070-ef11-a670-6045bdf9cd4f",
//               "startDate": "2024-08-23T19:30:39.000Z",
//               "endDate": "2024-08-23T21:30:00.000Z",
//               "occupancy": 4000,
//               "title": "New Job",
//               "bgColor": "rgb(40, 167, 69)",
//               "jobstatus": "Completed",
//               "startFormatDate": "8/24/2024 1:00 AM",
//               "endFormatedEstimatedDate": "8/24/2024 3:00 AM"
//           },
//           {
//               "id": "0211872f-666f-ef11-a670-6045bdf9cd4f",
//               "startDate": "2024-09-14T11:16:33.000Z",
//               "endDate": "2024-09-17T02:30:00.000Z",
//               "occupancy": 4000,
//               "title": "Nice",
//               "bgColor": "rgb(40, 167, 69)",
//               "jobstatus": "Completed",
//               "estimatedcost": 110,
//               "labourcosthr": 10,
//               "labourhours": 10,
//               "startFormatDate": "9/14/2024 4:46 PM",
//               "endFormatedEstimatedDate": "9/17/2024 8:00 AM"
//           },
//           {
//               "id": "c1fe365e-666f-ef11-a670-6045bdf9cd4f",
//               "startDate": "2024-09-16T18:30:36.000Z",
//               "endDate": "2024-09-18T17:30:00.000Z",
//               "occupancy": 4000,
//               "title": "Nice 1",
//               "bgColor": "rgb(253, 126, 20)",
//               "jobstatus": "On Hold",
//               "estimatedcost": 100,
//               "labourcosthr": 14,
//               "labourhours": 5,
//               "startFormatDate": "9/17/2024 12:00 AM",
//               "endFormatedEstimatedDate": "9/18/2024 11:00 PM"
//           },
//           {
//               "id": "75631125-2065-ef11-a671-0022486d99a6",
//               "startDate": "2024-08-28T08:00:14.000Z",
//               "endDate": "2024-08-29T09:30:00.000Z",
//               "occupancy": 4000,
//               "title": "Prexa Job 1",
//               "bgColor": "rgb(21, 132, 191)",
//               "jobstatus": "Work In Progress",
//               "estimatedcost": 100,
//               "labourcosthr": 8,
//               "labourhours": 10,
//               "startFormatDate": "8/28/2024 1:30 PM",
//               "endFormatedEstimatedDate": "8/29/2024 3:00 PM"
//           },
//           {
//               "id": "0982ea33-2065-ef11-a671-0022486d99a6",
//               "startDate": "2024-09-03T09:30:28.000Z",
//               "endDate": "2024-09-05T02:30:00.000Z",
//               "occupancy": 4000,
//               "title": "Prexa Job 2",
//               "bgColor": "rgb(21, 180, 191)",
//               "jobstatus": "New",
//               "labourcosthr": 10,
//               "labourhours": 5,
//               "startFormatDate": "9/3/2024 3:00 PM",
//               "endFormatedEstimatedDate": "9/5/2024 8:00 AM"
//           },
//           {
//               "id": "8fc9d740-2065-ef11-a671-0022486d99a6",
//               "startDate": "2024-08-27T09:30:49.000Z",
//               "endDate": "2024-08-30T02:30:00.000Z",
//               "occupancy": 4000,
//               "title": "Prexa Job 3",
//               "bgColor": "rgb(220, 53, 53)",
//               "jobstatus": "Cancelled",
//               "startFormatDate": "8/27/2024 3:00 PM",
//               "endFormatedEstimatedDate": "8/30/2024 8:00 AM"
//           },
//           {
//               "id": "52f2eb68-e070-ef11-a670-000d3a09c8c5",
//               "startDate": "2024-08-25T06:30:24.000Z",
//               "endDate": "2024-08-25T16:00:00.000Z",
//               "occupancy": 4000,
//               "title": "Sai",
//               "bgColor": "rgb(21, 180, 191)",
//               "jobstatus": "New",
//               "estimatedcost": 700,
//               "labourhours": 10,
//               "startFormatDate": "8/25/2024 12:00 PM",
//               "endFormatedEstimatedDate": "8/25/2024 9:30 PM"
//           },
//           {
//               "id": "197750b0-9a6e-ef11-a670-6045bdf9cd4f",
//               "startDate": "2024-09-17T18:30:33.000Z",
//               "endDate": "2024-09-18T18:30:00.000Z",
//               "occupancy": 4000,
//               "title": "Sample",
//               "bgColor": "rgb(21, 180, 191)",
//               "jobstatus": "New",
//               "estimatedcost": 300,
//               "labourcosthr": 14,
//               "labourhours": 20,
//               "startFormatDate": "9/18/2024 12:00 AM",
//               "endFormatedEstimatedDate": "9/19/2024 12:00 AM"
//           }
//       ]
//   }
// ]
function App() {
  const [dataverseData, setDataverseData] = useState<SchedulerRow[]>(
   []
);
const [selectedOption, setSelectedOption] = useState('')
const [selectedOptions, setSelectedOptions] = useState<string[]>([])
const options = [
    'New',
    'Work In Progress',
    'On Hold',
    'Completed',
    'Cancelled',
]
const [usedata, setUseData] = useState<SchedulerRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
const [filterButtonState, setFilterBtnState] = useState(0);
  const [values] = useState({
    peopleCount: 15,
    projectsPerYear: 5,
    yearsCovered: 0,
    startDate: undefined,
    maxRecordsPerPage: 50,
    isFullscreen: true,
  });
  // const { peopleCount, projectsPerYear, yearsCovered, isFullscreen, maxRecordsPerPage } = values;
//   // const mocked = useMemo(
//   //   () => createMockData(+peopleCount, +yearsCovered, +projectsPerYear),
//   //   [peopleCount, projectsPerYear, yearsCovered]
//   // );
// console.log(mocked)
  useEffect(() => {
    const fetchData = async () => {
      // -------------------------------
      const results = await dataRetrive();
      const transformedData = transformData(results.entities);
      console.log(transformedData, 'transformedData');
      // --------------------------------
      setDataverseData(transformedData);
      setUseData(transformedData);

      // const finalData =SampleData.map(item => ({
      //   ...item,
      //   data: item.data.map(project => ({
      //     ...project,
      //     startDate: new Date(project.startDate),
      //     endDate: new Date(project.endDate)
      //   }))
      // }))
      // setDataverseData(finalData);
      // console.log(transformedData, 'transformedData');
      setIsLoading(false)
    };
    fetchData();
  }, []);

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleRangeChange = useCallback((range: ParsedDatesRange) => {
    setRange(range);
  }, []);

  const filteredData = useMemo(
    () =>
      // Filter data based on the range
    dataverseData?.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, 'day') &&
              dayjs(project.endDate).isAfter(range.endDate, 'day'))
        ).map(project => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: new Date(project.endDate),
        })),
      })),
    [dataverseData, range.endDate, range.startDate]
  );

 const handleFilterButton=()=>{
    setFilterBtnState(filterButtonState === 0 ? 1 : 0)
 }

  const handleTileClick = (data: SchedulerProjectData) =>
    console.log(
      `Item ${data.title} was clicked. \n==============\nStart date: ${data.startDate} \n==============\nEnd date: ${data.endDate}\n==============\nOccupancy: ${data.occupancy}`
    );
    console.log(dataverseData, 'dataverseData');
    // Filter Functionality code down bellow
    interface FormData {
      StartDate: string;
      EndDate: string;
      JobStatus: string[];
      // minEstimatedCost: number;
      // maxEstimatedCost: number;
      minLabourChargesPerHour: number;
      maxLabourChargesPerHour: number;
      minLabourHours: number;
      maxLabourHours: number;
    }

    const [formData, setFormData] = useState<FormData>({
      StartDate: '',
      EndDate: '',
      JobStatus: [],
      // minEstimatedCost: 0,
      // maxEstimatedCost: 0,
      minLabourChargesPerHour: 0,
      maxLabourChargesPerHour: 0,
      minLabourHours: 0,
      maxLabourHours: 0,
    });
    formData.JobStatus = selectedOptions
    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        if (e.target.value && !selectedOptions.includes(e.target.value)) {
            setSelectedOptions([...selectedOptions, e.target.value])
            setSelectedOption('')
        }
    }
    const handleRemoveOption = (option: string) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== option))
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    console.log(formData, 'formData');
    function filterSampleData(data: SchedulerRow[], conditions: FormData) {
      // Helper function to safely parse dates
      const parseDate = (dateString: Date|string ) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
      };
    
      // Helper function to compare values dynamically
      const compareValues = (value: any, minCondition: any, maxCondition: any) => {
        const numValue = Number(value);
        const numMinCondition = Number(minCondition);
        const numMaxCondition = Number(maxCondition);
    
        if (numMinCondition === numMaxCondition) return true; // Ignore if min and max are the same
    
        if (numMinCondition === 0 && numMaxCondition === 0) return true; // Ignore if both are zero
        if (numMinCondition === 0) return numValue <= numMaxCondition; // Only check max
        if (numMaxCondition === 0) return numValue >= numMinCondition; // Only check min
        return numValue >= numMinCondition && numValue <= numMaxCondition; // Check both min and max
      };
    
      return data.map(item => ({
        ...item,
        data: item.data.filter(job => {
          // console.log(Object.entries(conditions))
          return Object.entries(conditions).every(([key, value]) => {
            switch (key) {
              case 'StartDate': {
                const jobStartDate = parseDate(job.startDate)?.toISOString() ?? '';
                const conditionStartDate = parseDate(value as string)?.toISOString() ?? '';
                return value === undefined || value === '' || jobStartDate >= conditionStartDate;
              }
              case 'EndDate': {
                const jobEndDate = parseDate(job.endDate)?.toISOString() ?? '';
                const conditionEndDate = parseDate(value as string)?.toISOString() ?? '';
                return value === undefined || value === '' || jobEndDate <= conditionEndDate;
              }
              case 'JobStatus':{
                console.log(value, 'value');
                return value === undefined || value === '' || value.length === 0 || value.includes(job.jobstatus);
              }
              // case 'minEstimatedCost':
              //   return compareValues(job.estimatedcost, value, conditions.maxEstimatedCost);
              // case 'maxEstimatedCost':
              //   return compareValues(job.estimatedcost, conditions.minEstimatedCost, value);
              case 'minLabourChargesPerHour':
                return compareValues(job.labourcosthr, value, conditions.maxLabourChargesPerHour);
              case 'maxLabourChargesPerHour':
                return compareValues(job.labourcosthr, conditions.minLabourChargesPerHour, value);
              case 'minLabourHours':
                return compareValues(job.labourhours, value, conditions.maxLabourHours);
              case 'maxLabourHours':
                return compareValues(job.labourhours, conditions.minLabourHours, value);
              default:
                return true; // Ignore unknown conditions
            }
          });
        })
      })).filter(item => item.data.length > 0);
    }
    const addFilters = () => {
      console.log('addFilters');
     const finalData = filterSampleData(usedata, formData);
     setDataverseData(finalData);
     console.log(finalData, 'finalData');
      handleFilterButton();
    };
    
    //   console.log('addFilters')
    //   const filteredDataverse = dataverseData.filter((person) => {
    //     const { data } = person;
    //     return data.some((project) => {
    //       const {
    //         StartDate,
    //         EndDate,
    //         JobStatus,
    //         minEstimatedCost,
    //         maxEstimatedCost,
    //         minLabourChargesPerHour,
    //         maxLabourChargesPerHour,
    //         minLabourHours,
    //         maxLabourHours,
    //       } = formData;

    //       // Filter by start date and end date
    //       if (
    //         StartDate &&
    //         EndDate &&
    //         (dayjs(project.startDate).isBefore(StartDate) ||
    //           dayjs(project.endDate).isAfter(EndDate))
    //       ) {
    //         return false;
    //       }

    //       // Filter by job status
    //       if (JobStatus && JobStatus.length > 0 && !JobStatus.includes(project.jobstatus)) {
    //         console.log(JobStatus, 'JobStatus')
    //         return false;
    //       }

    //       // Filter by estimated cost
    //       if (
    //         (minEstimatedCost && (project.estimatedcost ?? 0) < +minEstimatedCost) ||
    //         (maxEstimatedCost && (project.estimatedcost ?? 0) > +maxEstimatedCost)
    //       ) {
    //         return false;
    //       }

    //       // Filter by labour charges per hour
    //       if (
    //         (minLabourChargesPerHour &&
    //           (project.labourcosthr ?? 0) < +minLabourChargesPerHour) ||
    //         (maxLabourChargesPerHour &&
    //           (project.labourcosthr ?? 0) > +maxLabourChargesPerHour)
    //       ) {
    //         return false;
    //       }

    //       // Filter by labour hours
    //       if (
    //         (minLabourHours && (project.labourhours ?? 0) < +minLabourHours) ||
    //         (maxLabourHours && (project.labourhours ?? 0) > +maxLabourHours)
    //       ) {
    //         return false;
    //       }

    //       return true;
    //     });
    //   });
      

    //   setDataverseData(filteredDataverse)
    //   console.log(filteredDataverse, 'filteredDataverse')
    //   handleFilterButton()
    //   // Do something with the filtered data
    // };
const resetData = () => {
    setDataverseData(usedata.map((item) => ({
      ...item,
      data: item.data.map((project) => ({
        ...project,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
      })),
    })));
    setSelectedOptions([])
    setSelectedOption('')
    setFormData({
      StartDate: '',
      EndDate: '',
      JobStatus: [],
      // minEstimatedCost: 0,
      // maxEstimatedCost: 0,
      minLabourChargesPerHour: 0,
      maxLabourChargesPerHour: 0,
      minLabourHours: 0,
      maxLabourHours: 0,
    });
    setFilterBtnState(0)
}
  return (
    <div className=''>
      <div className="filtersSection z-50 absolute  top-1.5 text-white px-2 rounded left-52 flex gap-2">
        <button className={`flex items-center gap-1 p-1 px-3 text-sm font-semibold  rounded`} onClick={handleFilterButton}  style={{ backgroundColor: filterButtonState?"#3498db":"#00375C" }}>Filter <CiFilter/></button>
        <button className={`flex items-center gap-1 p-1 px-3 text-sm font-semibold bg-orange-500 rounded`} onClick={resetData}>Reset</button>
        {filterButtonState !== 0 && <div className={`FilterSection border w-96 z-50 absolute bg-white top-10 rounded text-black`}>
            <form
                action=""
                className="text-sm flex flex-col gap-3 mx-auto p-4 w-[100%]"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="Owner" className="font-semibold ">
                        Start Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        id="StartDate"
                        name="StartDate"
                        className="border  p-2 w-full rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="Owner" className="font-semibold ">
                        End Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        id="EndDate"
                        name="EndDate"
                        className="border  p-2 w-full rounded-md"
                        onChange={handleChange}
                    />
                </div>

                <div className="statusSection flex flex-col gap-1">
                    <label htmlFor="Job Status" className="font-semibold">
                        Job Status
                    </label>
                    <select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="p-2 border rounded mb-1 w-full"
                    >
                        <option value="">Select an option</option>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-1 p-1  rounded flex-wrap">
                        {selectedOptions.map((option) => (
                            <div
                                key={option}
                                className="bg-gray-200 rounded p-1 text-xs flex gap-1 items-center "
                            >
                                {option}
                                <button
                                    onClick={() => handleRemoveOption(option)}
                                    className=" text-sm text-white"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="flex flex-col gap-1">
                    <label htmlFor="Estimated Cost" className="font-semibold ">
                        Estimated Cost
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="minEstimatedCost"
                            name="minEstimatedCost"
                            className="border p-2 w-full rounded-md"
                            placeholder="Min"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="maxEstimatedCost"
                            name="maxEstimatedCost"
                            className="border p-2 w-full rounded-md"
                            placeholder="Max"
                            onChange={handleChange}
                        />
                    </div>
                </div> */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="LabourChargesPerHour"
                        className="font-semibold "
                    >  Labour Charges /hr
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            id="minLabourChargesPerHour"
                            name="minLabourChargesPerHour"
                            className="border p-2 w-full rounded-md"
                            placeholder="Min"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            id="maxLabourChargesPerHour"
                            name="maxLabourChargesPerHour"
                            className="border p-2 w-full rounded-md"
                            placeholder="Max"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* <Progressbar /> */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="LabourHours" className="font-semibold ">
                        Labour Hours
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            id="minLabourHours"
                            name="minLabourHours"
                            className="border p-2 w-full rounded-md"
                            placeholder="Min"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            id="maxLabourHours"
                            name="maxLabourHours"
                            className="border p-2 w-full rounded-md"
                            placeholder="Max"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="button" className="m-1 font-semibold bg-slate-200 p-2 rounded hover:bg-slate-400" onClick={addFilters}>
                    Search
                </button>
            </form>
        </div>}
        </div>
      {values.isFullscreen ? (
        <Scheduler
          startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
          onRangeChange={handleRangeChange}
          data={filteredData || []}
          isLoading={isLoading}
          onTileClick={(data)=>redirectToRecord(data.id)}
            // onFilterData={handleFilterData}
          config={{ zoom: 1, maxRecordsPerPage: values.maxRecordsPerPage,showTooltip:true,defaultTheme:"light",filterButtonState:-1 }}
          onItemClick={(data) => console.log(data.toString())}
        />
      ) : (
        <StyledSchedulerFrame>
          <Scheduler
            startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
            onRangeChange={handleRangeChange}
            isLoading={false}
            data={filteredData}
            onTileClick={handleTileClick}
            // onFilterData={handleFilterData}
            onItemClick={(data) => console.log('clicked: ', data)}
          />
        </StyledSchedulerFrame>
      )}
    </div>
  );
}

export default App;
