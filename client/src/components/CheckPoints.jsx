import React from 'react';

function CheckPoints({ checkpoints }) {
  return (
    <div className="p-4  rounded-xl shadow-md border border-gray-200 max-h-[350px] overflow-y-auto w-full">
      {/* <h2 className="text-xl font-semibold mb-4 text-gray-800">
        🚩 Selected Checkpoints
      </h2> */}

      <ol className="relative border-l border-green-400 space-y-6 pl-4">
        {checkpoints.length > 0 ? (
          checkpoints.map((cp, i) => (
            <li key={i} className="relative pl-6 text-start space-y-1">
              {/* Green dot */}
              <div className="absolute w-3 h-3 bg-green-500 rounded-full left-0 top-2"></div>

              {/* Checkpoint Instruction */}
              <p className="text-sm font-semibold ">
                {i + 1}. {cp.instruction}
              </p>

              {/* Address */}
              <p className="text-xs flex items-start gap-1">
                <span className="text-base">📍</span>
                <span className="leading-snug">{cp.address.formatted}</span>
              </p>

              {/* Time Info */}
              <p className="text-xs ">
                ⏱ <strong>Reached at:</strong>{' '}
                {cp.time > 3600
                  ? `${Math.floor(cp.time / 3600)} hr ${Math.round(
                      (cp.time % 3600) / 60
                    )} min`
                  : `${Math.round(cp.time / 60)} min`}
              </p>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-sm">No checkpoints generated yet.</li>
        )}
      </ol>
    </div>
  );
}

export default CheckPoints;
