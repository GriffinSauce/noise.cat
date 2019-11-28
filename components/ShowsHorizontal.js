import {
  FiActivity,
  FiMapPin,
  FiAlignLeft,
  FiPhone,
  FiDollarSign,
} from 'react-icons/fi';

const ShowsHorizontal = ({ shows }) => {
  return (
    <>
      <table>
        <tr>
          <td></td>
          <td></td>
          <th className="icon">
            <FiActivity />
          </th>
          <th className="icon">
            <FiMapPin />
          </th>
          <th className="icon">
            <FiAlignLeft />
          </th>
          <th className="icon">
            <FiPhone />
          </th>
          <th className="icon">
            <FiDollarSign />
          </th>
        </tr>
        {shows.map((show, index) => (
          <tr>
            <td className="date">{show.date}</td>
            <td className="status">{show.status}</td>

            <td className="title">{show.title}</td>
            <td className="location">
              <div>{show.location}</div>
            </td>
            <td className="note">
              <div>{show.note}</div>
            </td>
            <td className="contact">
              <div>{show.contact}</div>
            </td>
            <td className="pay">
              <div>{show.pay}</div>
            </td>
          </tr>
        ))}
      </table>

      <style jsx>{`
        table {
          border-collapse: separate;
          border-spacing: 0 10px;
        }
        td {
          vertical-align: top;
        }

        .icon {
          padding: 0 0 0 5px;
          text-align: left;
          font-size: 16px;
        }
        .icon::after {
          display: block;
          content: '';
          margin: 5px 10px 0 0;
          height: 4px;
          background-color: #f1f1f1;
          border: none;
          border-radius: 4px;
        }

        .date {
          width: 60px;
          padding: 10px;
          background-color: #f1f1f1;
          border-radius: 4px 0 0 4px;
        }
        .status {
          width: 80px;
          padding: 10px;
          background-color: #dae4e0;
          border-radius: 0 4px 4px 0;
        }

        .title,
        .location,
        .note,
        .contact,
        .pay {
          padding: 0 10px;
        }

        .title {
          width: 250px;
          font-weight: 600;
        }

        .location,
        .note {
          width: 175px;
        }

        .contact,
        .pay {
          width: 100px;
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

export default ShowsHorizontal;
