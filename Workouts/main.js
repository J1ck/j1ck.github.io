const IndexToMonth = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const SearchButton = document.querySelector("#search");
const TodaysWODButton = document.querySelector("#today");
const SearchInput = document.querySelector("input[type='search']");

let WorkoutCache = {};

function ValidateResponse(Response) {
    if (Response.ok) {
        return Response.text();
    }
    throw Response;
}

function FilterWorkouts(Text, CustomSearchText) {
    const Results = document.createElement("div");
    Results.setAttribute("id", "results");
    Results.innerHTML = Text;

    const AllDates = Results.querySelectorAll(`h1`);
    const SearchString = CustomSearchText || SearchInput.value;

    const Split = SearchString.split("/");
    const Day = parseInt(Split[0]);
    const Month = parseInt(Split[1]);

    let AllDatesArray = Array.from(AllDates);
    AllDatesArray.sort((a, b) => {
        return parseInt(a.textContent.split("/")[0]) - parseInt(b.textContent.split("/")[0]);
    });

    let CurrentYear = new Date().getFullYear();

    for (let Heading of AllDatesArray) {
        const SplitHeading = Heading.textContent.split("/");
        const HeadingDay = parseInt(SplitHeading[0]);
        const HeadingMonth = parseInt(SplitHeading[1]);

        Heading.textContent = `${SplitHeading[0]}/${SplitHeading[1]}/${CurrentYear}`;
        Heading.parentElement.parentElement.appendChild(Heading.parentElement);

        if (Split.length >= 2 && HeadingMonth == Month && HeadingDay >= Day) {
            continue
        }

        if (Heading.textContent.search(SearchString) == -1) {
            Heading.parentElement.remove();
        }
    }

    if (Results.childElementCount == 0) {
        Results.remove();
    }else {
        document.body.appendChild(Results);
    }
}

function Render(CustomSearchText) {
    const StartTime = Date.now() / 1000;

    for (Div of document.querySelectorAll("#results")) {
        Div.remove();
    }

    for (let Month of IndexToMonth) {
        FilterWorkouts(WorkoutCache[Month], CustomSearchText);
    }

    const EndTime = Date.now() / 1000;
    const TotalTime = EndTime - StartTime;
    const ToMilliseconds = Math.round(TotalTime * 1000);

    document.querySelector("#search-time").textContent = `rendered in ${ToMilliseconds}ms`;

    if (document.querySelectorAll(`#results`).length == 0) {
        const Message = document.createElement("p");
        Message.innerText = `no results found`;
        Message.setAttribute("id", "results");

        document.body.appendChild(Message);
    }
}

function SearchTodaysWOD() {
    const CurrentDate = new Date();
    const Format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2
    });
    const Day = Format.format(CurrentDate.getDate());
    const Month = Format.format(CurrentDate.getMonth() + 1);
    const ToSearchable = `${Day}/${Month}/`;

    Render(ToSearchable);
}

function Intialize() {
    SearchButton.addEventListener("click", () => {
        Render();
    });

    SearchInput.addEventListener("search", () => {
        Render();
    })
    
    TodaysWODButton.addEventListener("click", SearchTodaysWOD);

    SearchTodaysWOD();
}

let FilesLoaded = 0;

for (let Month of IndexToMonth) {
    fetch(`months/${Month}.html`)
        .then(ValidateResponse)
        .then(Text => {
            WorkoutCache[Month] = Text;

            FilesLoaded++;

            if (FilesLoaded == IndexToMonth.length) {
                Intialize();
            }
        })
}