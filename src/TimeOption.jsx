export function TimeOption({ data, getId}) {
    return (
        <div onClick={e => { getId(e, data.id) }} className="time prevent-sdataect" key={data.id}>
          <div className="time-wheather-image">
            <img src={data.image} alt={data.condition} />
          </div>
          <div className='option-time'>
            <p>
              {(data.time != undefined) ? data.time + ":00" : data.day}
            </p>
          </div>
        </div>
    )
}