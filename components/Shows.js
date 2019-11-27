import { FiMapPin, FiAlignLeft, FiPhone, FiDollarSign } from 'react-icons/fi';

const Shows = ({ shows }) => {
  return (
    <>
      <ul>
        {shows.map((show, index) => (
          <li>
            <header>
              <div className="date">{show.date}</div>
              <div className="status">{show.status}</div>
            </header>
            <div className="body">
              <div className="title">{show.title}</div>
              <div className="location">
                <div className="icon">
                  <FiMapPin />
                </div>
                <div>{show.location}</div>
              </div>
              <div className="note">
                <div className="icon">
                  <FiAlignLeft />
                </div>
                <div>{show.note}</div>
              </div>
              <div className="contact">
                <div className="icon">
                  <FiPhone />
                </div>
                <div>{show.contact}</div>
              </div>
              <div className="pay">
                <div className="icon">
                  <FiDollarSign />
                </div>
                <div>{show.pay}</div>
              </div>
            </div>
            {index !== shows.length - 1 ? <hr /> : null}
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        li {
          margin: 20px 0;
        }

        header {
          display: flex;
          margin: 0 0 10px 0;
        }
        .date {
          flex-shrink: 0;
          margin: 0;
          padding: 10px;
          background-color: #f1f1f1;
          border-radius: 4px 0 0 4px;
        }
        .status {
          flex-shrink: 0;
          margin: 0;
          padding: 10px;
          background-color: #dae4e0;
          border-radius: 0 4px 4px 0;
        }
        .title {
          font-weight: 600;
          margin: 0 0 15px 0;
        }
        .body {
        }
        .location,
        .note,
        .contact,
        .pay {
          display: flex;
          margin: 15px 0;
        }

        .icon {
          margin: 0 10px 0 0;
        }

        hr {
          display: block;
          content: '';
          margin: 20px 5px;
          height: 4px;
          background-color: #f1f1f1;
          border: none;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default Shows;
